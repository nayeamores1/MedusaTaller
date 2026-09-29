import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, MedusaError, Modules } from "@medusajs/framework/utils"
import {
  createRegionsWorkflow,
  createServiceZonesWorkflow,
  createShippingOptionsWorkflow,
  createTaxRegionsWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function addEcRegion({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const regions = container.resolve(Modules.REGION)
  const taxes = container.resolve(Modules.TAX)
  const fulfillment = container.resolve(Modules.FULFILLMENT)

  const existing = await regions.listRegions({}, { relations: ["countries"] })
  let region = existing.find((item) => item.countries?.some((c) => c.iso_2 === "ec"))
  if (!region) {
    const { result } = await createRegionsWorkflow(container).run({
      input: {
        regions: [{
          name: "Ecuador",
          currency_code: "usd",
          countries: ["ec"],
          payment_providers: ["pp_system_default"],
        }],
      },
    })
    region = result[0]
  }
  if (region.currency_code !== "usd") {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "La región existente de Ecuador debe usar USD")
  }

  if (!(await taxes.listTaxRegions({ country_code: "ec" })).length) {
    await createTaxRegionsWorkflow(container).run({
      input: [{ country_code: "ec", provider_id: "tp_system" }],
    })
  }

  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["id", "supported_currencies.*"],
  })
  const store = stores[0]
  if (!store) throw new MedusaError(MedusaError.Types.NOT_FOUND, "Ejecuta primero las migraciones y el seed del taller")
  const currencies = new Set([
    ...store.supported_currencies.map((c) => c.currency_code), "usd", "eur",
  ])
  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [...currencies].map((currency_code) => ({
          currency_code,
          is_default: currency_code === "usd",
        })),
      },
    },
  })

  // Reuse the seeded warehouse, already linked to inventory and the sales channel.
  const { data: locations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "fulfillment_sets.id", "fulfillment_sets.type"],
  })
  const fulfillmentSet = locations.flatMap((l) => l.fulfillment_sets ?? [])
    .find((set) => set.type === "shipping")
  if (!fulfillmentSet) throw new MedusaError(MedusaError.Types.NOT_FOUND, "No existe un almacén con fulfillment de envío")
  let [zone] = await fulfillment.listServiceZones({
    name: "Ecuador", fulfillment_set: { id: fulfillmentSet.id },
  })
  if (!zone) {
    const { result } = await createServiceZonesWorkflow(container).run({
      input: { data: [{
        name: "Ecuador",
        fulfillment_set_id: fulfillmentSet.id,
        geo_zones: [{ type: "country", country_code: "ec" }],
      }] },
    })
    zone = result[0]
  }
  const [profile] = await fulfillment.listShippingProfiles({ type: "default" })
  if (!profile) throw new MedusaError(MedusaError.Types.NOT_FOUND, "Falta el perfil de envío predeterminado")
  const options = await fulfillment.listShippingOptions({
    service_zone: { id: zone.id }, name: "Standard",
  })
  if (!options.length) {
    await createShippingOptionsWorkflow(container).run({
      input: [{
        name: "Standard",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: zone.id,
        shipping_profile_id: profile.id,
        type: { label: "Standard", description: "Envío estándar para Ecuador", code: "standard-ec" },
        prices: [
          { currency_code: "usd", amount: 10 },
          { region_id: region.id, amount: 10 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      }],
    })
  }
  logger.info("Ecuador listo: USD, pago manual, región fiscal y envío Standard de $10")
}
