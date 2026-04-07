import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.siteSetting.deleteMany();

  // ─── Site Settings ───
  const settings = [
    { key: "heroImg", value: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&auto=format&fit=crop&q=80" },
    { key: "heroPromoLabel", value: "COLECCIÓN 2026" },
    { key: "heroPromoSub", value: "Diseño que transforma tu hogar" },
    { key: "promoBannerLabel", value: "COLECCIÓN EXCLUSIVA" },
    { key: "promoBannerTitle", value: "DISEÑO SIN COMPROMISO" },
    { key: "promoBannerDesc", value: "Cada pieza seleccionada para elevar tu espacio. Calidad artesanal, diseño intemporal." },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }

  // ─── Categories ───

  // 1. SALA DE ESTAR
  const sala = await prisma.category.create({
    data: {
      name: "Sala de Estar",
      slug: "sala",
      heroImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format&fit=crop&q=80",
      order: 1,
      subcategories: {
        create: [
          {
            name: "Sofás",
            slug: "sofas",
            order: 1,
            products: {
              create: [
                { brand: "Cassina", name: "Sofá Sengu 3 Plazas", description: "Tapizado en bouclé natural patas de roble", price: 4200, badge: "NUEVO", stock: 5, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80" },
                { brand: "B&B Italia", name: "Sofá Charles", description: "Cuero plena flor estructura metálica mate", price: 6800, stock: 3, image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&auto=format&fit=crop&q=80" },
                { brand: "Knoll", name: "Sofá Florence", description: "Tejido lana tapicería a medida", price: 3900, stock: 4, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&auto=format&fit=crop&q=80" },
                { brand: "Arflex", name: "Sofá Marenco", description: "Espuma de alta densidad icónico", price: 5100, badge: "EXCLUSIVO", stock: 2, image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&auto=format&fit=crop&q=80" },
                { brand: "Minotti", name: "Sofá Laurence", description: "Velvet gris acero diseño italiano", price: 7200, stock: 3, image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&auto=format&fit=crop&q=80" },
                { brand: "Poliform", name: "Sofá Park", description: "Seccional modular infinitas configuraciones", price: 8900, badge: "MÁS VENDIDO", stock: 1, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Sillones",
            slug: "sillones",
            order: 2,
            products: {
              create: [
                { brand: "Fritz Hansen", name: "Egg Chair", description: "Diseño de Arne Jacobsen tapizado a elegir", price: 3400, badge: "CLÁSICO", stock: 4, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80" },
                { brand: "Herman Miller", name: "Eames Lounge Chair", description: "Cuero natural y nogal americano", price: 4100, stock: 2, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&auto=format&fit=crop&q=80" },
                { brand: "Cassina", name: "LC2 Petit Confort", description: "Le Corbusier acero cromado", price: 3800, stock: 3, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&auto=format&fit=crop&q=80" },
                { brand: "Arper", name: "Sillón Loom", description: "Tejido natural base en madera maciza", price: 1800, stock: 6, image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600&auto=format&fit=crop&q=80" },
                { brand: "Ligne Roset", name: "Togo", description: "Espuma integral tapizado suave", price: 2600, stock: 4, image: "https://images.unsplash.com/photo-1573866926487-a1865558a9cf?w=600&auto=format&fit=crop&q=80" },
                { brand: "B&B Italia", name: "Fat-Fat", description: "Patricia Urquiola polipiel premium", price: 2900, stock: 3, image: "https://images.unsplash.com/photo-1611967164521-abae8fba4668?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Mesas de Centro",
            slug: "mesas-centro",
            order: 3,
            products: {
              create: [
                { brand: "B&B Italia", name: "Mesa Butterfly", description: "Vidrio templado y acero lacado", price: 1900, stock: 5, image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&auto=format&fit=crop&q=80" },
                { brand: "Cassina", name: "Mesa Accent", description: "Mármol Calacatta patas doradas", price: 3200, badge: "NUEVO", stock: 2, image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&auto=format&fit=crop&q=80" },
                { brand: "Knoll", name: "Tulip Coffee Table", description: "Base pedestal en aluminio blanco", price: 1400, stock: 7, image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&auto=format&fit=crop&q=80" },
                { brand: "Minotti", name: "Mesa Wedge", description: "Nogal macizo acabado natural", price: 2100, stock: 4, image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Estanterías",
            slug: "estanterias",
            order: 4,
            products: {
              create: [
                { brand: "Vitsoe", name: "Sistema 606", description: "El sistema modular más icónico del siglo XX", price: 2800, badge: "CLÁSICO", stock: 3, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&auto=format&fit=crop&q=80" },
                { brand: "Cassina", name: "Librería Infinito", description: "Cerezo y acero personalizable", price: 4500, stock: 2, image: "https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?w=600&auto=format&fit=crop&q=80" },
                { brand: "String", name: "String System", description: "Diseño escandinavo montaje mural", price: 890, stock: 8, image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&auto=format&fit=crop&q=80" },
                { brand: "USM Haller", name: "USM Haller Shelving", description: "Acero cromado indestructible", price: 3600, stock: 2, image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Created category: Sala de Estar", sala.id);

  // 2. COMEDOR
  const comedor = await prisma.category.create({
    data: {
      name: "Comedor",
      slug: "comedor",
      heroImg: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&auto=format&fit=crop&q=80",
      order: 2,
      subcategories: {
        create: [
          {
            name: "Mesas de Comedor",
            slug: "mesas",
            order: 1,
            products: {
              create: [
                { brand: "Cassina", name: "Mesa À Quatre Mains", description: "Nogal macizo hasta 10 personas", price: 5800, badge: "EXCLUSIVO", stock: 2, image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=600&auto=format&fit=crop&q=80" },
                { brand: "Fritz Hansen", name: "Mesa Supercircular", description: "Diseño de Piet Hein", price: 3200, stock: 3, image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&auto=format&fit=crop&q=80" },
                { brand: "Knoll", name: "Mesa Saarinen Oval", description: "Base tulipán en aluminio", price: 2900, stock: 4, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80" },
                { brand: "Poliform", name: "Mesa Concorde", description: "Vidrio extra claro acero inox", price: 4100, badge: "NUEVO", stock: 3, image: "https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=600&auto=format&fit=crop&q=80" },
                { brand: "B&B Italia", name: "Mesa Maxalto", description: "Fresno tintado extensible hasta 3m", price: 6200, stock: 2, image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&auto=format&fit=crop&q=80" },
                { brand: "Arper", name: "Mesa Zef", description: "Resina fenólica base metálica", price: 1800, stock: 5, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Sillas",
            slug: "sillas",
            order: 2,
            products: {
              create: [
                { brand: "Fritz Hansen", name: "Silla Series 7", description: "La silla más vendida del mundo", price: 890, badge: "MÁS VENDIDO", stock: 10, image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop&q=80" },
                { brand: "Cassina", name: "Silla 412 CAB", description: "Cuero sellado estructura de acero", price: 1200, stock: 6, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&auto=format&fit=crop&q=80" },
                { brand: "Knoll", name: "Bertoia Side Chair", description: "Varilla metálica cojín incluido", price: 760, stock: 8, image: "https://images.unsplash.com/photo-1551298370-9d3d53bc4f18?w=600&auto=format&fit=crop&q=80" },
                { brand: "Vitra", name: "Hal Wood", description: "Base roble carcasa polipropileno", price: 540, stock: 12, image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&auto=format&fit=crop&q=80" },
                { brand: "Arper", name: "Catifa 46", description: "Apilable tapizado integral opcional", price: 480, stock: 15, image: "https://images.unsplash.com/photo-1561677978-583a8c7a4b43?w=600&auto=format&fit=crop&q=80" },
                { brand: "Magis", name: "Chair One", description: "Fundición de aluminio apilable", price: 620, stock: 7, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Aparadores",
            slug: "aparadores",
            order: 3,
            products: {
              create: [
                { brand: "Poliform", name: "Aparador Alambra", description: "Lacado mate herrajes dorados", price: 3800, badge: "NUEVO", stock: 2, image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&auto=format&fit=crop&q=80" },
                { brand: "Cassina", name: "Aparador 605", description: "Nogal patas metálicas altas", price: 4600, stock: 1, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&auto=format&fit=crop&q=80" },
                { brand: "B&B Italia", name: "Aparador Maxalto", description: "Cerezo interiores lacados", price: 5100, stock: 2, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80" },
                { brand: "Minotti", name: "Aparador Sullivan", description: "Metal puertas de cristal ahumado", price: 2900, stock: 3, image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Created category: Comedor", comedor.id);

  // 3. DORMITORIO
  const dormitorio = await prisma.category.create({
    data: {
      name: "Dormitorio",
      slug: "dormitorio",
      heroImg: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&auto=format&fit=crop&q=80",
      order: 3,
      subcategories: {
        create: [
          {
            name: "Camas",
            slug: "camas",
            order: 1,
            products: {
              create: [
                { brand: "Poliform", name: "Cama Letto Moderno", description: "Cabecero tapizado estructura de madera", price: 4800, badge: "MÁS VENDIDO", stock: 3, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=80" },
                { brand: "B&B Italia", name: "Cama Charles", description: "Cabecero extragrande base flotante", price: 6200, stock: 2, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80" },
                { brand: "Cassina", name: "Cama Noctis", description: "Apertura lateral colchón incluido", price: 5400, badge: "NUEVO", stock: 2, image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&auto=format&fit=crop&q=80" },
                { brand: "Minotti", name: "Cama Yang", description: "Roble tapizado en bouclé", price: 7100, badge: "EXCLUSIVO", stock: 1, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&auto=format&fit=crop&q=80" },
                { brand: "Flou", name: "Cama Nathalie", description: "Tejido desmontable y lavable", price: 3200, stock: 4, image: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=600&auto=format&fit=crop&q=80" },
                { brand: "Ligne Roset", name: "Cama Topaze", description: "Bajo al suelo tapizado integral", price: 2900, stock: 3, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Mesitas de Noche",
            slug: "mesitas",
            order: 2,
            products: {
              create: [
                { brand: "Poliform", name: "Mesita Letto", description: "Nogal cajón push", price: 980, stock: 6, image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&auto=format&fit=crop&q=80" },
                { brand: "Minotti", name: "Mesita Yang", description: "Tablero de mármol base dorada", price: 1400, badge: "NUEVO", stock: 4, image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&auto=format&fit=crop&q=80" },
                { brand: "B&B Italia", name: "Mesita Maxalto", description: "Lacada múltiples acabados", price: 1100, stock: 5, image: "https://images.unsplash.com/photo-1551298370-9d3d53bc4f18?w=600&auto=format&fit=crop&q=80" },
                { brand: "Cassina", name: "Mesita Noctis", description: "Compacta con estante y USB", price: 860, stock: 8, image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Cómodas",
            slug: "comodas",
            order: 3,
            products: {
              create: [
                { brand: "Poliform", name: "Cómoda Senzafine", description: "Lacada tiradores de acero inox", price: 2800, badge: "EXCLUSIVO", stock: 2, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&auto=format&fit=crop&q=80" },
                { brand: "Minotti", name: "Cómoda Sullivan", description: "4 cajones tablero de mármol negro", price: 3400, stock: 3, image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&auto=format&fit=crop&q=80" },
                { brand: "Ligne Roset", name: "Cómoda Trica", description: "Roble acabado natural", price: 1900, stock: 4, image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80" },
                { brand: "B&B Italia", name: "Cómoda Maxalto", description: "Cerezo patas metálicas", price: 4100, stock: 2, image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Armarios",
            slug: "armarios",
            order: 4,
            products: {
              create: [
                { brand: "Poliform", name: "Armario Senzafine", description: "Puertas correderas interior personalizable", price: 8900, badge: "MÁS VENDIDO", stock: 1, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&auto=format&fit=crop&q=80" },
                { brand: "Porro", name: "Armario Link", description: "Modular lacado o madera", price: 6400, stock: 2, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80" },
                { brand: "Molteni", name: "Armario 505", description: "Modulación libre acabados premium", price: 7200, badge: "NUEVO", stock: 2, image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&auto=format&fit=crop&q=80" },
                { brand: "Rimadesio", name: "Armario Zenit", description: "Puertas de cristal aluminio anodizado", price: 5800, stock: 1, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Created category: Dormitorio", dormitorio.id);

  // 4. ILUMINACIÓN
  const iluminacion = await prisma.category.create({
    data: {
      name: "Iluminación",
      slug: "iluminacion",
      heroImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&auto=format&fit=crop&q=80",
      order: 4,
      subcategories: {
        create: [
          {
            name: "Lámparas de Pie",
            slug: "pie",
            order: 1,
            products: {
              create: [
                { brand: "Artemide", name: "Tolomeo Lettura", description: "Aluminio anodizado brazo articulado", price: 1140, badge: "CLÁSICO", stock: 5, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&auto=format&fit=crop&q=80" },
                { brand: "Flos", name: "Arco", description: "Mármol de Carrara ícono del diseño", price: 2800, badge: "EXCLUSIVO", stock: 2, image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600&auto=format&fit=crop&q=80" },
                { brand: "Louis Poulsen", name: "Panthella Floor", description: "Acrílico opal base de acero", price: 1900, stock: 3, image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&auto=format&fit=crop&q=80" },
                { brand: "Oluce", name: "Atollo Floor", description: "Aluminio blanco Vico Magistretti", price: 2100, stock: 3, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Lámparas de Mesa",
            slug: "mesa",
            order: 2,
            products: {
              create: [
                { brand: "Artemide", name: "Tolomeo Tavolo", description: "Aluminio anodizado brazo articulado", price: 680, stock: 7, image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&auto=format&fit=crop&q=80" },
                { brand: "Flos", name: "Kelvin LED", description: "LED integrado temperatura regulable", price: 890, badge: "NUEVO", stock: 5, image: "https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=600&auto=format&fit=crop&q=80" },
                { brand: "Louis Poulsen", name: "PH 2/1", description: "Cristal soplado sin deslumbramiento", price: 1200, stock: 4, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80" },
                { brand: "Vibia", name: "Flamingo Table", description: "LED batería recargable inalámbrica", price: 460, stock: 10, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Colgantes",
            slug: "colgantes",
            order: 3,
            products: {
              create: [
                { brand: "Louis Poulsen", name: "PH 5 Pendant", description: "Icónico de Poul Henningsen", price: 1800, badge: "CLÁSICO", stock: 3, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=80" },
                { brand: "Flos", name: "IC Light Suspension", description: "Cristal soplado minimalista", price: 1400, stock: 4, image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&auto=format&fit=crop&q=80" },
                { brand: "Artemide", name: "Pirce Suspension", description: "Aluminio en espiral LED indirecta", price: 2200, badge: "NUEVO", stock: 2, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&auto=format&fit=crop&q=80" },
                { brand: "Vibia", name: "Wireflow", description: "Estructura geométrica de cable", price: 3100, badge: "EXCLUSIVO", stock: 1, image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Created category: Iluminación", iluminacion.id);

  // 5. EXTERIOR
  const exterior = await prisma.category.create({
    data: {
      name: "Exterior",
      slug: "exterior",
      heroImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80",
      order: 5,
      subcategories: {
        create: [
          {
            name: "Muebles de Jardín",
            slug: "jardin",
            order: 1,
            products: {
              create: [
                { brand: "Kettal", name: "Set Bitta", description: "Aluminio y teca resistente a UV", price: 3800, badge: "MÁS VENDIDO", stock: 3, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80" },
                { brand: "Gloster", name: "Set Emu 4", description: "Tejido náutico aluminio", price: 4200, stock: 2, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&auto=format&fit=crop&q=80" },
                { brand: "Tribu", name: "Set Landscape", description: "Materiales naturales sostenible", price: 5600, badge: "NUEVO", stock: 2, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80" },
                { brand: "Gandia Blasco", name: "Set Stack", description: "Apilable fibra sintética premium", price: 2800, stock: 4, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Tumbonas",
            slug: "tumbonas",
            order: 2,
            products: {
              create: [
                { brand: "Kettal", name: "Tumbona Bitta", description: "Aluminio lacado tela náutica", price: 1800, stock: 5, image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&auto=format&fit=crop&q=80" },
                { brand: "Tribu", name: "Tumbona Versus", description: "Teca respaldo regulable", price: 2200, badge: "EXCLUSIVO", stock: 2, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80" },
                { brand: "Gandia Blasco", name: "Tumbona Flat", description: "Ruedas integradas colchoneta 8cm", price: 1600, stock: 4, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80" },
                { brand: "Gloster", name: "Tumbona Rattan", description: "Rattan sintético resistente UV", price: 1400, stock: 6, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
          {
            name: "Mesas Exterior",
            slug: "mesas-ext",
            order: 3,
            products: {
              create: [
                { brand: "Kettal", name: "Mesa Bitta", description: "Cerámica base de aluminio", price: 2400, badge: "NUEVO", stock: 3, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&auto=format&fit=crop&q=80" },
                { brand: "Tribu", name: "Mesa T-Table", description: "Teca maciza tratamiento natural", price: 3100, stock: 2, image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&auto=format&fit=crop&q=80" },
                { brand: "Gandia Blasco", name: "Mesa Flat", description: "Acero inoxidable plegable", price: 1200, stock: 5, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80" },
                { brand: "Gloster", name: "Mesa Grid", description: "Aluminio y HPL varios tamaños", price: 1800, stock: 4, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80" },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Created category: Exterior", exterior.id);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
