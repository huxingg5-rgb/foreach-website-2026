import { tubingAssemblyTypes, tubingAssembliesDescription, getTubingAssemblyPath } from "@/data/products/tubing-assemblies.en";
// English homepage product-family entries using catalog and user-provided images.
export const productGroups = ["Featured", "Pumps", "Valves", "Probes", "Tubing", "Fittings", "Smart Control", "Tubing Assemblies"] as const;

const tubingAssemblyHomeImages = {
  "flanged-tubing": "/images/home/flanged-tubing-white-shadow.png",
  "retaining-ring-kits": "/images/home/retaining-ring-kit-white-shadow.png",
  "ferrule-kits": "/images/home/ferrule-kit-white-shadow.png",
} satisfies Record<(typeof tubingAssemblyTypes)[number]["id"], string>;

export const englishHomeProducts = [
  {
    "id": "plunger",
    "group": "Pumps",
    "name": "Piston Pumps",
    "description": "Controlled aspiration and dispensing of samples and reagents for instrument dosing and liquid metering.",
    "image": "/images/home/products/foreach-home-piston-pumps.webp",
    "imageAlt": "FOREACH EA, SM and TM piston pumps shown side by side",
    "href": "/en/products/pumps/piston-pump/",
    "featured": true,
    "illustrative": false
  },
  {
    "id": "dpl",
    "group": "Pumps",
    "name": "Diaphragm Pumps",
    "description": "Liquid transfer, priming and washing for instrument fluid supply and drainage.",
    "image": "/images/home/products/foreach-home-diaphragm-pump.webp",
    "imageAlt": "FOREACH miniature diaphragm pump with motor and black pump head",
    "href": "/en/products/pumps/miniature-diaphragm-pumps/",
    "featured": true,
    "illustrative": false
  },
  {
    "id": "smtp2",
    "group": "Pumps",
    "name": "SMTP2 Pipetting Module",
    "description": "Integrated drive and control with liquid-level, tip-presence and blockage detection for automated pipetting.",
    "image": "/images/home/products/foreach-home-smtp2-pipetting-module.webp",
    "imageAlt": "FOREACH SMTP2 pipetting module with pipetting shaft and control board",
    "href": "/en/products/pumps/pipetting-pumps/smtp2-programmable-pipetting-module/",
    "featured": true,
    "illustrative": false
  },
  {
    "id": "rpl",
    "group": "Pumps",
    "name": "Valveless Metering Pumps",
    "description": "Valveless design for liquid metering, dosing and reagent transfer in instruments.",
    "image": "/images/home/products/foreach-home-valveless-metering-pump.webp",
    "imageAlt": "FOREACH valveless metering pump with motor and pump head",
    "href": "/en/products/pumps/valveless-metering-pump/",
    "featured": true,
    "illustrative": false
  },
  {
    "id": "assembly",
    "group": "Tubing Assemblies",
    "name": "Tubing Assemblies",
    "description": tubingAssembliesDescription,
    "image": "/images/home/products/foreach-home-tubing-assemblies.webp",
    "imageAlt": "FOREACH tubing assemblies with fitted connectors",
    "href": getTubingAssemblyPath(),
    "featured": true,
    "illustrative": false
  },
  {
    "id": "tube",
    "group": "Tubing",
    "name": "Tubing",
    "description": "Rigid and flexible tubing in PVC and other materials, with customizable inner and outer diameters and lengths.",
    "image": "/images/home/products/foreach-home-instrument-tubing.webp",
    "imageAlt": "FOREACH transparent and translucent instrument tubing",
    "href": "/en/products/tubing/",
    "featured": true,
    "illustrative": false
  },
  {
    "id": "quick",
    "group": "Fittings",
    "name": "Quick-Connect Fittings",
    "description": "For tubing IDs from 1.6 to 19.0 mm, with bulkhead and inline, valved and non-valved options. Custom configurations available.",
    "image": "/images/home/products/foreach-home-quick-connect-fittings.webp",
    "imageAlt": "FOREACH quick-connect fittings in multiple shapes and sizes",
    "href": "/en/products/fittings/quick-connect-fittings/",
    "featured": true,
    "illustrative": false
  },
  {
    "id": "needle",
    "group": "Probes",
    "name": "Probes",
    "description": "Customizable probe designs for sampling, piercing and washing applications.",
    "image": "/images/home/products/foreach-home-instrument-probes.webp",
    "imageAlt": "FOREACH instrument probes with metal shafts and connection assemblies",
    "href": "/en/products/probes/",
    "featured": true,
    "illustrative": false
  },
  ...tubingAssemblyTypes.map(item => ({
    id: item.id, group: "Tubing Assemblies", name: item.name,
    description: item.description, image: tubingAssemblyHomeImages[item.id],
    href: getTubingAssemblyPath(item.id), featured: false, illustrative: false,
  })),
  {
    "id": "family0",
    "group": "Pumps",
    "name": "Syringe Pumps",
    "description": "Integrated syringe and valve assemblies.",
    "image": "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.webp",
    "href": "/en/products/pumps/syringe-pumps/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "mrv",
    "group": "Valves",
    "name": "Rotary Valves",
    "description": "Select and switch between fluid pathways.",
    "image": "/images/products/valves/rotary-valves/foreach-rotary-valve-main.webp",
    "href": "/en/products/valves/rotary-valves/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family2",
    "group": "Valves",
    "name": "Solenoid Valves",
    "description": "Electrical control of instrument fluid pathways.",
    "image": "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",
    "href": "/en/products/valves/solenoid-valves/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family3",
    "group": "Valves",
    "name": "High-Pressure Valves",
    "description": "Valve options for demanding fluid paths.",
    "image": "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
    "href": "/en/products/valves/high-pressure-valves/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family4",
    "group": "Probes",
    "name": "Sampling Probes",
    "description": "Sample aspiration and transfer.",
    "image": "/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp",
    "href": "/en/products/probes/sampling-probes/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family5",
    "group": "Probes",
    "name": "Piercing Probes",
    "description": "Probe options for piercing applications.",
    "image": "/images/products/probes/piercing-probes/foreach-piercing-probe-main.webp",
    "href": "/en/products/probes/piercing-probes/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family6",
    "group": "Probes",
    "name": "Wash Probes",
    "description": "Probe components for washing workflows.",
    "image": "/images/products/probes/wash-probes/foreach-wash-probe-main.webp",
    "href": "/en/products/probes/wash-probes/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family7",
    "group": "Probes",
    "name": "Stirring Paddles",
    "description": "Mixing components for instrument workflows.",
    "image": "/images/products/probes/stirring-paddles/foreach-stirring-paddle-main.webp",
    "href": "/en/products/probes/stirring-paddles/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family8",
    "group": "Tubing",
    "name": "PVC Tubing",
    "description": "Explore material and dimension options.",
    "image": "/images/products/tubing/pvc-tubing/pvc-tubing-main.webp",
    "href": "/en/products/tubing/pvc-tubing/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family9",
    "group": "Tubing",
    "name": "TPU Tubing",
    "description": "Explore material and dimension options.",
    "image": "/images/products/tubing/tpu-tubing/tpu-tubing-main.webp",
    "href": "/en/products/tubing/tpu-tubing/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family10",
    "group": "Tubing",
    "name": "FEP Tubing",
    "description": "Explore material and dimension options.",
    "image": "/images/products/tubing/fep-tubing/fep-tubing-main.webp",
    "href": "/en/products/tubing/fep-tubing/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family11",
    "group": "Tubing",
    "name": "PTFE Tubing",
    "description": "Explore material and dimension options.",
    "image": "/images/products/tubing/ptfe-tubing/ptfe-tubing-main.webp",
    "href": "/en/products/tubing/ptfe-tubing/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family12",
    "group": "Tubing",
    "name": "PEEK Tubing",
    "description": "Explore material and dimension options.",
    "image": "/images/products/tubing/peek-tubing/peek-tubing-main.webp",
    "href": "/en/products/tubing/peek-tubing/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family13",
    "group": "Tubing",
    "name": "PFA Tubing",
    "description": "Explore material and dimension options.",
    "image": "/images/products/tubing/pfa-tubing/pfa-tubing-main.webp",
    "href": "/en/products/tubing/pfa-tubing/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family14",
    "group": "Fittings",
    "name": "Hard Tube Fittings",
    "description": "Connections for rigid tubing.",
    "image": "/images/products/FIT/For rigid tubing_200x200_01_v001.jpg",
    "href": "/en/products/fittings/hard-tube-fittings/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family15",
    "group": "Fittings",
    "name": "Barbed Fittings",
    "description": "Connections for flexible tubing.",
    "image": "/images/products/FIT/Barbed connector_200x200_01_v001.jpg",
    "href": "/en/products/fittings/barbed-fittings/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family16",
    "group": "Fittings",
    "name": "Thread-to-Barbed Fittings",
    "description": "Connect threaded ports to tubing.",
    "image": "/images/products/FIT/Thread with barb_200x200_01_v001.jpg",
    "href": "/en/products/fittings/thread-to-barbed-fittings/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family17",
    "group": "Fittings",
    "name": "Luer Fittings",
    "description": "Luer connection options.",
    "image": "/images/products/FIT/Luer fitting_200x200_01_v001.jpg",
    "href": "/en/products/fittings/luer-fittings/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family18",
    "group": "Fittings",
    "name": "Female Thread Adapters",
    "description": "Threaded connection adapters.",
    "image": "/images/products/FIT/Union_200x200_01_v001.jpg",
    "href": "/en/products/fittings/female-thread-adapters/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family19",
    "group": "Fittings",
    "name": "Bulkhead Barbed Fittings",
    "description": "Panel-mounted tubing connections.",
    "image": "/images/products/FIT/Panel mountunion_200x200_01_v001.jpg",
    "href": "/en/products/fittings/bulkhead-barbed-fittings/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family20",
    "group": "Fittings",
    "name": "Filters & Check Valves",
    "description": "Components for your fluid path.",
    "image": "/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg",
    "href": "/en/products/fittings/filters/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family21",
    "group": "Smart Control",
    "name": "Air Bubble Detectors",
    "description": "Monitor air bubbles within tubing.",
    "image": "/images/products/control/foreach-abd-air-bubble-detector.webp",
    "href": "/en/products/control/air-bubble-detectors/abd/",
    "featured": false,
    "illustrative": false
  },
  {
    "id": "family22",
    "group": "Smart Control",
    "name": "Pressure Sensors",
    "description": "Monitor pressure in your fluid path.",
    "image": "/images/products/control/foreach-pdm5-pressure-sensor.webp",
    "href": "/en/products/control/pdm5-pressure-sensor/",
    "featured": false,
    "illustrative": false
  }
];
