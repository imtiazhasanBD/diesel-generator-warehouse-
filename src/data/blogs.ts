export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "Engineering Guide" | "Maintenance" | "Acoustics" | "Brand Comparison" | "Electrical Systems" | "Efficiency";
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  alt: string;
  excerpt: string;
  content: {
    intro: string;
    keyTakeaways: string[];
    sections: {
      heading: string;
      body: string[];
      table?: {
        headers: string[];
        rows: string[][];
      };
      callout?: string;
    }[];
    conclusion: string;
  };
  tags: string[];
  relatedSlugs: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "how-to-calculate-accurate-kva-sizing-for-industrial-facilities",
    title: "How to calculate accurate kVA sizing for industrial facilities",
    category: "Engineering Guide",
    readTime: "6 min read",
    date: "November 14, 2026",
    author: {
      name: "Engr. Hassan Tariq",
      role: "Lead Electrical Systems Engineer",
      avatar: "/assets/images/team-1.jpg"
    },
    image: "/assets/images/engine-circle.jpg",
    alt: "Diesel engine turbocharger and industrial facility wiring",
    excerpt: "Sizing a diesel generator for high inductive motor loads, inrush starting currents, and power factor correction in Bangladesh RMG and manufacturing facilities.",
    content: {
      intro: "One of the most critical and expensive mistakes facility managers in Bangladesh make is undersizing or oversizing their diesel generator sets. Undersizing causes frequent circuit breaker trips, voltage dips, and catastrophic alternator overheating during motor starts. Conversely, continuous oversizing leads to light-load operation below 30%, which induces 'wet stacking' — unburned fuel accumulation in the exhaust manifold that ruins engine cylinder liners.",
      keyTakeaways: [
        "Always account for starting kVA (SkVA), which can be 3x to 6x higher than motor running kVA depending on starter type (DOL vs. Star-Delta vs. VFD).",
        "Maintain a standard industrial power factor (PF) of 0.8 lagging to accurately convert between kW and kVA.",
        "Target steady-state prime operation at 70% to 80% of rated capacity for optimal fuel economy and maximum engine lifespan.",
        "Size generator alternator thermal capacity to sustain a maximum transient voltage dip of 15% to 20% to avoid dropping sensitive PLC and SCADA controllers."
      ],
      sections: [
        {
          heading: "1. The Fundamental kW to kVA Conversion Formula",
          body: [
            "In alternating current (AC) power systems, apparent power (kVA) and real active power (kW) are related by the load power factor (PF). For commercial and industrial gensets in Bangladesh, the universal standard power factor is 0.8.",
            "kVA = Total Connected Running kW / 0.8",
            "For example, a spinning mill section consuming 240 kW of active electrical load requires a generator prime rating of at least: 240 kW / 0.8 = 300 kVA."
          ],
          callout: "Engineering Rule of Thumb: Never size a generator strictly on nameplate running wattage. The starting inrush current of AC induction motors is the defining sizing bottleneck."
        },
        {
          heading: "2. Motor Starting Methods & Inrush Multipliers",
          body: [
            "When heavy electric motors (such as air compressors, water pumps, blowers, and chillers) start, they draw large magnetizing currents known as locked-rotor kVA (LRkVA).",
            "Depending on the motor starting topology installed in your motor control center (MCC), the starting multiplier varies drastically:"
          ],
          table: {
            headers: ["Starting Method", "Starting Inrush Current", "Required kVA Multiplier", "Recommended Generator Sizing"],
            rows: [
              ["Direct On Line (DOL)", "6.0x – 7.0x full load current", "3.0x – 3.5x running kVA", "Requires high-output Stamford / Leroy Somer alternator"],
              ["Star-Delta (Y-Δ)", "2.5x – 3.0x full load current", "1.8x – 2.2x running kVA", "Standard industrial silent canopy genset"],
              ["Soft Starter", "2.0x – 2.5x full load current", "1.5x – 1.8x running kVA", "Cost-effective, smooth voltage step"],
              ["Variable Frequency Drive (VFD)", "1.0x – 1.25x full load current", "1.15x – 1.25x running kVA", "Safest for generator; requires THD filtering (<10%)"]
            ]
          }
        },
        {
          heading: "3. Ambient Derating Factors for Bangladesh Climate",
          body: [
            "Standard generator rating plates are calibrated under ISO 8528 conditions (25°C ambient temperature, 100 meters above sea level, and 30% relative humidity).",
            "In Bangladesh, ambient summer temperatures routinely cross 38°C to 44°C with relative humidity exceeding 85%. Engines suffer reduced air density while cooling radiators experience lower heat rejection efficiency.",
            "To prevent thermal derating and coolant boiling, always specify heavy-duty tropical radiators rated for +50°C ambient temperatures, and apply an engineering derating margin of 5% to 8% on prime continuous capacity."
          ]
        }
      ],
      conclusion: "Accurate kVA sizing safeguards your capital investment, lowers maintenance downtime, and ensures seamless automatic changeover during national grid failovers. If you are calculating facility sizing for an upcoming expansion, our engineering team provides free on-site electrical audit surveys across all 64 districts in Bangladesh."
    },
    tags: ["kVA Sizing", "Industrial Power", "Perkins", "Cummins", "Electrical Engineering"],
    relatedSlugs: [
      "diesel-generator-maintenance-peak-plant-efficiency",
      "perkins-vs-cummins-bangladesh-industrial-comparison"
    ]
  },
  {
    id: "blog-2",
    slug: "diesel-generator-maintenance-peak-plant-efficiency",
    title: "Diesel generator maintenance for peak plant efficiency",
    category: "Maintenance",
    readTime: "5 min read",
    date: "November 10, 2026",
    author: {
      name: "Kazi Moniruzzaman",
      role: "Director of Technical Field Services",
      avatar: "/assets/images/team-2.jpg"
    },
    image: "/assets/images/gen-control-panel.jpg",
    alt: "Digital generator control panel and maintenance telemetry",
    excerpt: "Essential daily, 250-hour, and 1,000-hour preventative maintenance checklists to eliminate unplanned shutdowns during grid load-shedding.",
    content: {
      intro: "A standby generator is your facility's ultimate life-support system. Yet industry surveys reveal that over 70% of generator startup failures during utility blackouts are caused by preventable maintenance oversights: flat starting batteries, clogged primary fuel filters, or stale contaminated diesel.",
      keyTakeaways: [
        "Test and clean battery terminals weekly — battery failure is the #1 reason diesel generators fail to crank.",
        "Perform primary lube oil and filter replacements strictly every 250 operational hours or at least once every 12 months.",
        "Check coolant specific gravity and corrosion inhibitors to protect cylinder liners from cavitation erosion.",
        "Run monthly test exercises under at least 50% electrical load to eliminate wet stacking in the exhaust silencer."
      ],
      sections: [
        {
          heading: "1. The 3-Tier Maintenance Schedule",
          body: [
            "To guarantee instant pickup within 8 seconds of grid failure, establish a disciplined three-tier service protocol:"
          ],
          table: {
            headers: ["Service Level", "Frequency Interval", "Core Maintenance Tasks", "Responsible Personnel"],
            rows: [
              ["Daily / Weekly Inspection", "Every 7 days (or daily during load-shedding)", "Check oil level, coolant level, battery voltage (>12.6V / >25.2V), inspect fuel leaks, drain water trap separator", "Facility Plant Operator"],
              ["Service Level A", "Every 250 Running Hours (or 6 months)", "Replace engine oil (15W-40 CI-4), lube filter, primary & secondary fuel filters, inspect fan belts and alternator terminals", "Certified Generator Technician"],
              ["Service Level B (Major)", "Every 1,000 Running Hours (or 12 months)", "Replace air filter elements, coolant flush, valve lash clearance adjustment, turbocharger end-play check, ATS contact inspection", "Authorized Factory Engineer"]
            ]
          }
        },
        {
          heading: "2. Combating Fuel Contamination & Algae Growth",
          body: [
            "Diesel fuel stored in sub-base tanks in high-humidity climates absorbs moisture through atmospheric breathing vents. Water condensate settles at the bottom of the fuel tank, fostering microbial diesel bugs (algae) that rapidly choke fuel injection pumps and common rail injectors.",
            "Install a transparent glass-bowl sedimenter water separator between the fuel tank and lift pump. Drain accumulated water weekly and dose bulk storage tanks with biocidal fuel stabilizers."
          ],
          callout: "Warning: Never use automotive grade lubricating oils in heavy continuous gensets. Always specify high-TBN (Total Base Number) diesel engine oil formulated to neutralize sulfur acids."
        }
      ],
      conclusion: "Consistent preventative maintenance costs a fraction of the losses incurred by an unexpected hour-long blackout during peak production. Our service fleet maintains 24/7 emergency dispatch teams equipped with genuine OEM filters and diagnostic tooling."
    },
    tags: ["Maintenance", "Deep Sea DSE", "Fuel Management", "Preventative Care"],
    relatedSlugs: [
      "how-to-calculate-accurate-kva-sizing-for-industrial-facilities",
      "diesel-generator-fuel-consumption-reduction-tactics"
    ]
  },
  {
    id: "blog-3",
    slug: "acoustic-attenuation-why-canopy-engineering-matters",
    title: "Acoustic attenuation: Why canopy engineering matters",
    category: "Acoustics",
    readTime: "6 min read",
    date: "November 04, 2026",
    author: {
      name: "Farhan Chowdhury",
      role: "Senior Acoustics & Vibration Specialist",
      avatar: "/assets/images/team-3.jpg"
    },
    image: "/assets/images/gen-alternator-shaft.jpg",
    alt: "Brushless alternator rotor shaft and acoustic attenuation canopy",
    excerpt: "Meeting Department of Environment (DoE) noise regulations in Dhaka and Chittagong with 68 dBA acoustic canopies and residential critical silencers.",
    content: {
      intro: "An unattenuated 250 kVA diesel generator operating on an open skid generates noise levels exceeding 102 dBA at 1 meter — comparable to standing next to a jet engine at takeoff. In densely populated urban zones like Gulshan, Motijheel, Agrabad, and Uttara, local municipal laws and Department of Environment (DoE) mandates strictly enforce maximum boundary noise thresholds below 70 dBA during daytime and 60 dBA at night.",
      keyTakeaways: [
        "Sound pressure scales logarithmically: a 3 dBA reduction cuts acoustic noise energy in half.",
        "Quality silent canopies utilize 50mm high-density mineral rockwool (100 kg/m³) wrapped in perforated galvanized steel sheeting.",
        "Air intake and exhaust louvers must incorporate sound splitters (attenuation baffles) to silence airflow turbulence without choking engine air intake.",
        "Anti-vibration spring and rubber mounts (AVMs) isolate mechanical engine vibration from the building slab, preventing structure-borne noise transmission."
      ],
      sections: [
        {
          heading: "1. The Anatomy of an Engineered Soundproof Canopy",
          body: [
            "A high-performance soundproof canopy does much more than cover the generator with sheet metal. It is an acoustically tuned environmental enclosure that manages three distinct noise sources: combustion clatter, mechanical vibration, and cooling fan air displacement.",
            "Top-tier canopies are constructed from 2.0mm to 2.5mm cold-rolled electro-galvanized sheet steel finished with electrostatic architectural powder coating rated for 1,000+ hours salt spray resistance."
          ],
          callout: "Acoustic Insight: Mineral wool rockwool density matters. Cheap canopies use lightweight 30 kg/m³ glass wool that deteriorates under oil fumes within 6 months. Industrial canopies demand 100 kg/m³ rockwool."
        },
        {
          heading: "2. Exhaust Silencer Grades: Industrial vs. Residential vs. Critical",
          body: [
            "The exhaust gas discharge is the single loudest acoustic path of an internal combustion engine. Specifying the correct exhaust silencer grade is vital:"
          ],
          table: {
            headers: ["Silencer Grade", "Sound Attenuation", "Residual Noise Level", "Typical Application Environment"],
            rows: [
              ["Industrial Grade", "15 to 20 dBA reduction", "85 – 90 dBA @ 7m", "Remote power plants, quarries, open construction sites"],
              ["Residential Grade", "25 to 30 dBA reduction", "72 – 75 dBA @ 7m", "Suburban commercial parks, warehouse depots, factories"],
              ["Critical / Hospital Grade", "35 to 42 dBA reduction", "65 – 68 dBA @ 7m", "Hospitals, universities, luxury hotels, urban residential towers"]
            ]
          }
        }
      ],
      conclusion: "Investing in certified 68 dBA silent canopy engineering prevents costly municipal penalties, preserves employee health, and eliminates neighbor disputes in dense commercial zones."
    },
    tags: ["Canopy Engineering", "Noise Attenuation", "Silent Genset", "DoE Compliance"],
    relatedSlugs: [
      "how-to-calculate-accurate-kva-sizing-for-industrial-facilities",
      "ats-panel-working-principle-auto-synchronization"
    ]
  },
  {
    id: "blog-4",
    slug: "perkins-vs-cummins-bangladesh-industrial-comparison",
    title: "Perkins vs. Cummins: Which generator best fits your factory in Bangladesh?",
    category: "Brand Comparison",
    readTime: "8 min read",
    date: "October 28, 2026",
    author: {
      name: "Engr. Tanvir Ahmed",
      role: "Industrial Power Consultant",
      avatar: "/assets/images/team-4.jpg"
    },
    image: "/assets/images/perkins-blue.jpg",
    alt: "Perkins blue silent industrial diesel generator",
    excerpt: "An in-depth analysis comparing fuel efficiency, spare parts availability, overhaul intervals, and initial acquisition cost between UK Perkins and USA Cummins.",
    content: {
      intro: "In Bangladesh's industrial heartlands — Gazipur, Narayanganj, Savar, Ashulia, and Chattogram — two engine names dominate over 80% of all prime and standby generator installations: Perkins (United Kingdom) and Cummins (USA/Global). Both are world-class powerhouses, but they excel in distinctly different operating profiles.",
      keyTakeaways: [
        "Perkins engines offer class-leading thermal efficiency and exceptionally low fuel consumption in the 20 kVA to 300 kVA standby range.",
        "Cummins heavy-duty blocks (such as the 6B, 6C, QSL, and NTA855 series) feature cast-iron wet cylinder liners that excel under continuous 24/7 prime duty and aggressive load steps.",
        "Both brands enjoy near 100% spare parts availability and skilled field technician familiarity across all divisions of Bangladesh.",
        "Cummins engines generally provide longer intervals between major top-overhauls under heavy continuous load."
      ],
      sections: [
        {
          heading: "1. Head-to-Head Specification & Operational Comparison",
          body: [
            "Here is how UK Perkins and Cummins compare across key engineering parameters for industrial deployments in Bangladesh:"
          ],
          table: {
            headers: ["Evaluation Criteria", "Perkins (UK)", "Cummins (USA/Global)", "Key Advantage"],
            rows: [
              ["Fuel Economy (L/kWh)", "0.22 – 0.24 L/kWh (Superior at 75% load)", "0.23 – 0.26 L/kWh (Optimized at full load)", "Perkins delivers slightly lower fuel burn in standby mode"],
              ["Overhaul Interval (Hours)", "12,000 – 15,000 running hours", "15,000 – 20,000 running hours", "Cummins wet liners offer easier and longer overhaul cycles"],
              ["Transient Load Step", "Meets ISO 8528 G2 standard", "Superior G3 rating; handles sudden motor start spikes", "Cummins excels on heavy inductive motor loads"],
              ["Parts Availability in BD", "Widely available in Nawabpur & Dholaikhal", "Extremely widespread stock across all industrial hubs", "Tie; both have instant replacement availability"],
              ["Initial Capital Cost", "Competitive in 20 – 250 kVA tier", "Cost-effective in 250 – 1500 kVA tier", "Depends on specific kVA capacity requirement"]
            ]
          }
        },
        {
          heading: "2. The Verdict by Application",
          body: [
            "For Standby Duty (High-rise residential, IT offices, commercial towers, telecom): Perkins is often the preferred choice due to its refined acoustics, compact footprint, and exceptional low-load fuel economy.",
            "For Continuous Prime Duty (Steel re-rolling mills, textile spinning, cold storage, continuous garment lines): Cummins heavy cast-iron architecture provides maximum mechanical toughness and extended durability under fluctuating ambient conditions."
          ]
        }
      ],
      conclusion: "Whichever brand you select, sourcing 100% genuine engines with verified country-of-origin certificates and matched Stamford brushless alternators is paramount to avoiding counterfeit assemblies."
    },
    tags: ["Perkins", "Cummins", "Brand Comparison", "Industrial Power"],
    relatedSlugs: [
      "how-to-calculate-accurate-kva-sizing-for-industrial-facilities",
      "diesel-generator-fuel-consumption-reduction-tactics"
    ]
  },
  {
    id: "blog-5",
    slug: "ats-panel-working-principle-auto-synchronization",
    title: "Automatic Transfer Switch (ATS) & multi-genset synchronization explained",
    category: "Electrical Systems",
    readTime: "6 min read",
    date: "October 20, 2026",
    author: {
      name: "Engr. Rafiqul Islam",
      role: "Automation & Switchgear Specialist",
      avatar: "/assets/images/team-1.jpg"
    },
    image: "/assets/images/cad-exploded.svg",
    alt: "Automatic transfer switch and electrical CAD schematic",
    excerpt: "How modern DSE controllers manage sub-8-second auto-start failover, load shedding, and peak shaving during National Grid interruptions.",
    content: {
      intro: "In modern industrial and healthcare facilities, power continuity is measured in seconds. An Automatic Transfer Switch (ATS) panel is the intelligent bridge connecting the National Grid utility power, the standby generator, and the facility distribution switchboard.",
      keyTakeaways: [
        "A motorized 4-pole changeover switch guarantees that utility neutral and generator neutral are mechanically isolated, preventing dangerous back-feeding.",
        "Automatic engine failover executes four timed phases: Grid Loss Detection -> Engine Crank -> Voltage/Frequency Stabilization -> Contact Transfer (<8 seconds total).",
        "Multi-genset synchronization allows two or more generators to parallel on a common busbar, dynamically adding or shedding units to match fluctuating facility demand.",
        "Deep Sea DSE 8610 and DSE 7320 controllers provide built-in telemetry, SMS alarms, and remote web SCADA monitoring."
      ],
      sections: [
        {
          heading: "1. The 4-Stage Failover Sequence",
          body: [
            "When the national grid fails or experiences severe under-voltage/phase loss, the ATS panel executes an automated safety sequence:"
          ],
          table: {
            headers: ["Step Number", "Phase Name", "Typical Duration", "Action Triggered"],
            rows: [
              ["Step 1", "Mains Failure Verification", "1.0 – 3.0 seconds", "Filters transient grid flickers and dips to prevent false starts"],
              ["Step 2", "Engine Remote Crank", "2.0 – 4.0 seconds", "Energizes pre-glow and starter motor; engine fires to 1500 RPM"],
              ["Step 3", "Alternator AVR Stabilization", "2.0 seconds", "AVR stabilizes 400V ±0.5% and 50Hz ±0.25% frequency"],
              ["Step 4", "Motorized Breaker Transfer", "<0.5 seconds", "Opens utility contactor with interlock, closes generator breaker"]
            ]
          }
        },
        {
          heading: "2. Why Synchronization Beats One Massive Generator",
          body: [
            "Rather than installing a single massive 1,000 kVA generator that runs inefficiently at 20% load during night shifts, smart plants install two 500 kVA synchronized units.",
            "During peak shifts, both generators synchronize automatically on the common busbar. When demand drops at night, the controller seamlessly stops the second unit, cutting fuel burn in half and providing N+1 redundancy."
          ]
        }
      ],
      conclusion: "Investing in a motorized, mechanically interlocked ATS panel with Deep Sea UK digital controls ensures your plant never loses valuable production time when the grid drops."
    },
    tags: ["ATS Panel", "Synchronization", "Deep Sea", "Switchgear"],
    relatedSlugs: [
      "how-to-calculate-accurate-kva-sizing-for-industrial-facilities",
      "diesel-generator-maintenance-peak-plant-efficiency"
    ]
  },
  {
    id: "blog-6",
    slug: "diesel-generator-fuel-consumption-reduction-tactics",
    title: "5 practical tactics to reduce diesel consumption and operating costs by 18%",
    category: "Efficiency",
    readTime: "5 min read",
    date: "October 12, 2026",
    author: {
      name: "Engr. Hassan Tariq",
      role: "Lead Electrical Systems Engineer",
      avatar: "/assets/images/team-1.jpg"
    },
    image: "/assets/images/commercial-white.jpg",
    alt: "Fuel efficient commercial silent diesel generator",
    excerpt: "Preventing wet stacking, maintaining 70-80% optimal prime loading, and utilizing high-efficiency turbochargers to cut diesel fuel bills.",
    content: {
      intro: "With diesel fuel prices reaching historic highs in Bangladesh, the operational cost of running standby generators has become a significant overhead for factories and commercial buildings. Implementing five field-proven engineering adjustments can cut your monthly fuel expenditure by 15% to 18% without reducing factory uptime.",
      keyTakeaways: [
        "Avoid running diesel engines below 30% load — engines operate with maximum thermal efficiency between 70% and 80% load.",
        "Calibrate fuel injector spray atomization and valve lash timing every 1,000 operating hours.",
        "Ensure air intake filters are clean: a restricted air filter increases fuel consumption by up to 6% due to air starvation.",
        "Correct low facility power factor from 0.70 to 0.95 using an Automatic Power Factor Correction (PFI) capacitor bank to reduce alternator electrical drag."
      ],
      sections: [
        {
          heading: "1. The Diesel Fuel Consumption Curve by kVA Rating",
          body: [
            "Understanding standard fuel burn rates under varying load conditions helps benchmark your plant's efficiency:"
          ],
          table: {
            headers: ["Generator Capacity", "50% Load (L/hr)", "75% Load (L/hr)", "100% Load (L/hr)", "Hourly Cost @ 105 BDT/L (75% Load)"],
            rows: [
              ["30 kVA Diesel", "4.2 L/h", "5.8 L/h", "7.5 L/h", "৳ 609 / hr"],
              ["100 kVA Perkins", "11.9 L/h", "17.1 L/h", "22.3 L/h", "৳ 1,795 / hr"],
              ["200 kVA Perkins", "23.1 L/h", "34.7 L/h", "45.8 L/h", "৳ 3,643 / hr"],
              ["500 kVA Cummins", "52.0 L/h", "77.0 L/h", "102.0 L/h", "৳ 8,085 / hr"]
            ]
          }
        },
        {
          heading: "2. The Impact of Power Factor Improvement (PFI)",
          body: [
            "If your plant operates with an uncorrected power factor of 0.65 to 0.72 due to old sewing machine or loom motors, the generator alternator must deliver excessive reactive current (kVAR). This creates heavy magnetic armature drag on the engine crankshaft, consuming additional liters of diesel per hour.",
            "Installing a micro-step PFI capacitor bank near the main busbar elevates power factor to 0.95, directly relieving engine torque demand and yielding immediate fuel savings."
          ]
        }
      ],
      conclusion: "Routine injector calibration, air filter maintenance, and power factor correction pay for themselves within months in diesel savings alone."
    },
    tags: ["Fuel Efficiency", "PFI Bank", "Operational Costs", "Green Energy"],
    relatedSlugs: [
      "how-to-calculate-accurate-kva-sizing-for-industrial-facilities",
      "perkins-vs-cummins-bangladesh-industrial-comparison"
    ]
  }
];

export const BLOGS_BY_SLUG: Record<string, BlogPost> = BLOG_POSTS.reduce(
  (acc, post) => {
    acc[post.slug] = post;
    return acc;
  },
  {} as Record<string, BlogPost>
);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOGS_BY_SLUG[slug] || BLOG_POSTS.find((p) => p.slug === slug);
}

