import inkjetRoutes from './industrial-inkjet-routes.json';

export const industrialInkjetPrinting = {
  slug: 'industrial-inkjet-printing',
  href: inkjetRoutes.hub,
  guide: {
    href: inkjetRoutes.guide,
    title: 'Industrial Inkjet Printer Fluidics Guide',
    description: 'Locate the supply, circulation and maintenance branches in an industrial inkjet printer and plan circuit-level validation.',
  },
  connectionGuide: {
    href: inkjetRoutes.connectionGuide,
    title: 'Tubing Assemblies and Fittings for Industrial Inkjet Printers',
    description: 'Select tubing assemblies, fixed fittings and quick disconnects for ink supply, return and maintenance lines.',
    tasks: [
      {
        href: inkjetRoutes.fixedInkLines,
        title: 'Fixed Ink Lines and Tubing Assemblies',
        description: 'Match tubing dimensions, end connections and wetted materials to installed ink and cleaning-fluid lines.',
      },
      {
        href: inkjetRoutes.inkTankQuickDisconnects,
        title: 'Ink Tank Changes and Maintenance Quick Disconnects',
        description: 'Choose service couplings for removable ink, cleaning-fluid and waste containers.',
      },
    ],
  },
  flowControlGuide: {
    href: inkjetRoutes.flowControlGuide,
    title: 'Ink Filtration, Check Valves and Flow Control',
    description: 'Locate filters, check valves and switching valves in industrial inkjet supply and maintenance circuits.',
    tasks: [
      {
        href: inkjetRoutes.inkFiltration,
        title: 'Ink Filtration for Industrial Inkjet Printers',
        description: 'Select an inkjet ink filter for the fill line or printhead inlet, measure pressure drop under load, and check for backflow after the pump stops.',
      },
      {
        href: inkjetRoutes.cleaningFluidSwitching,
        title: 'Cleaning Fluid Switching and Branch Isolation',
        description: 'Evaluate solenoid or multiport valves for isolating or switching printer maintenance branches.',
      },
    ],
  },
  title: 'Industrial Inkjet Printing',
  heading: 'Fluidic Components for Industrial Inkjet Printing',
  description: 'Explore pumps and fluidic components for ink supply, recirculation, printhead cleaning and waste ink handling in industrial inkjet equipment.',
  summary: 'Ink supply, return and circulation, printhead cleaning and waste ink handling in industrial inkjet equipment.',
  scenes: [
    {
      id: 'ink-supply',
      href: inkjetRoutes.supply,
      title: 'Ink Supply & Refill',
      image: '/images/applications/industrial-inkjet-printing/ink-supply.webp',
      menuPhoto: {
        src: '/images/applications/industrial-inkjet-printing/menu/ink-supply.webp',
        alt: 'Replaceable ink bags behind the clear cover of an Océ Arizona 480 GT flatbed printer',
      },
      alt: 'Illustration of ink reservoirs, a feed line, a filter and a pump in a printer cabinet',
      description: 'Move ink from the main reservoir to a sub-tank or the supply stage specified by the printer design. Confirm the refill rate at the target ink temperature with the actual tubing and filter installed.',
      selection: 'Evaluate DPL30 for lower-flow branches and DPL60 where the branch needs more working flow. For a long upstream line or higher filter resistance, evaluate DPL30H against the system curve and the pressure limits of downstream components.',
    },
    {
      id: 'ink-recirculation',
      href: inkjetRoutes.recirculation,
      title: 'Ink Recirculation & Return',
      image: '/images/applications/industrial-inkjet-printing/ink-recirculation.webp',
      menuPhoto: {
        src: '/images/applications/industrial-inkjet-printing/menu/ink-recirculation.webp',
        alt: 'Mimaki UJF-3042HG flatbed inkjet printer, a model with automatic white ink circulation',
      },
      alt: 'Illustration of a printhead manifold with supply and return lines and an ink sub-tank',
      description: 'Where the printhead and circuit support recirculation, return unused ink to the designated reservoir. Set the required loop flow separately from the printhead pressure window. The circuit design determines whether the return path needs its own pump.',
      selection: 'Evaluate DPL30 or DPL60 at the installed operating point. For white ink, check pigment settling in the reservoir and dead legs, flow after idle periods, filter loading and compatibility with the selected wetted materials.',
    },
    {
      id: 'printhead-cleaning',
      href: inkjetRoutes.cleaning,
      title: 'Printhead Cleaning & Waste Ink',
      image: '/images/applications/industrial-inkjet-printing/printhead-cleaning.webp',
      menuPhoto: {
        src: '/images/applications/industrial-inkjet-printing/menu/printhead-cleaning.webp',
        alt: 'Wiper blade and waste ink collection tray beneath a Xerox ColorQube printhead',
      },
      alt: 'Illustration of a parked printhead above a service station connected to a waste ink container',
      description: 'After a purge or cleaning cycle, route spent ink and cleaning fluid from the maintenance station to a dedicated waste container. The return path sends usable ink back to a reservoir.',
      selection: 'For a small auxiliary waste branch, evaluate DPL30 with the actual waste mixture. Check suction recovery after air entry, drainage time and compatibility with both the ink and the cleaning fluid.',
    },
  ],
} as const;

export function industrialInkjetSceneHref(scene: (typeof industrialInkjetPrinting.scenes)[number]) {
  return scene.href;
}
