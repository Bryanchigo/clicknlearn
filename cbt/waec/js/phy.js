export const physicsQuestions = [
    {
        id: "p1",
        textHTML: "Which of the following is a fundamental physical quantity?",
        topic: "Units and Measurement",
        options: ["Force", "Electric current", "Velocity", "Impulse"],
        answer: 1,
        explanation: "Electric current (measured in Amperes) is one of the seven base SI fundamental quantities. Force, velocity, and impulse are derived quantities."
    },
    {
        id: "p2",
        textHTML: "A body accelerates uniformly from rest at 2.0 m s<sup>-2</sup> for 10 s. Calculate the total distance covered.",
        topic: "Kinematics",
        options: ["10 m", "20 m", "100 m", "200 m"],
        answer: 2,
        explanation: "Using s = ut + &frac12;at<sup>2</sup>, where u = 0, a = 2.0 m s<sup>-2</sup>, t = 10 s: <br>s = 0 + &frac12;(2.0)(10)<sup>2</sup> = 100 m."
    },
    {
        id: "p3",
        textHTML: "The property of a body to remain at rest or continue in its state of uniform motion in a straight line is called:",
        topic: "Newton's Laws",
        options: ["Momentum", "Inertia", "Impulse", "Friction"],
        answer: 1,
        explanation: "Inertia is the natural tendency of an object to resist changes in its state of rest or motion, which forms the basis of Newton's First Law."
    },
    {
        id: "p4",
        textHTML: "A force of 50 N acts on an object of mass 10 kg. Determine the acceleration produced.",
        topic: "Newton's Laws",
        options: ["0.2 m s<sup>-2</sup>", "5.0 m s<sup>-2</sup>", "50 m s<sup>-2</sup>", "500 m s<sup>-2</sup>"],
        answer: 1,
        explanation: "Using Newton's Second Law F = ma &rArr; a = F / m = 50 N / 10 kg = 5.0 m s<sup>-2</sup>."
    },
    {
        id: "p5",
        textHTML: "Calculate the momentum of a 1200 kg car travelling at a velocity of 15 m s<sup>-1</sup>.",
        topic: "Momentum and Impulse",
        options: ["80 kg m s<sup>-1</sup>", "18,000 kg m s<sup>-1</sup>", "9,000 kg m s<sup>-1</sup>", "135,000 kg m s<sup>-1</sup>"],
        answer: 1,
        explanation: "Momentum p = mass &times; velocity = 1200 kg &times; 15 m s<sup>-1</sup> = 18,000 kg m s<sup>-1</sup>."
    },
    {
        id: "p6",
        textHTML: "Work done is defined mathematically as:",
        topic: "Work, Energy, and Power",
        options: ["Force &times; Velocity", "Force &times; Distance in direction of force", "Mass &times; Acceleration", "Power &times; Time<sup>2</sup>"],
        answer: 1,
        explanation: "Work done W = F &times; d &times; cos(&theta;), which represents the scalar product of force and displacement in the direction of the force."
    },
    {
        id: "p7",
        textHTML: "An object of mass 2.0 kg is lifted vertically through a height of 5.0 m. Calculate the potential energy gained. <br><em>[g = 10 m s<sup>-2</sup>]</em>",
        topic: "Work, Energy, and Power",
        options: ["10 J", "25 J", "100 J", "200 J"],
        answer: 2,
        explanation: "Gravitational Potential Energy PE = mgh = 2.0 kg &times; 10 m s<sup>-2</sup> &times; 5.0 m = 100 J."
    },
    {
        id: "p8",
        textHTML: "The rate of doing work or expending energy is known as:",
        topic: "Work, Energy, and Power",
        options: ["Impulse", "Power", "Momentum", "Pressure"],
        answer: 1,
        explanation: "Power is the rate at which work is done or energy is transferred per unit time (P = W / t)."
    },
    {
        id: "p9",
        textHTML: "Which of the following simple machines has a mechanical advantage always less than 1?",
        topic: "Simple Machines",
        options: ["First class lever", "Third class lever", "Incline plane", "Movable pulley"],
        answer: 1,
        explanation: "In third-class levers (like human arms or tweezers), the effort is between the load and fulcrum, so effort distance < load distance, making MA < 1."
    },
    {
        id: "p10",
        textHTML: "A machine with a velocity ratio of 5 requires an effort of 100 N to lift a load of 400 N. Calculate its efficiency.",
        topic: "Simple Machines",
        options: ["20%", "75%", "80%", "125%"],
        answer: 2,
        explanation: "MA = Load / Effort = 400 / 100 = 4. <br>Efficiency = (MA / VR) &times; 100% = (4 / 5) &times; 100% = 80%."
    },
    {
        id: "p11",
        textHTML: "The pressure exerted by a liquid column depends on:",
        topic: "Fluids and Pressure",
        options: ["Area of cross-section only", "Density, depth, and acceleration due to gravity", "Mass of the liquid only", "Shape of the container"],
        answer: 1,
        explanation: "Liquid pressure P = &rho;gh, where &rho; is density, g is gravitational acceleration, and h is depth below the liquid surface."
    },
    {
        id: "p12",
        textHTML: "Pascal's principle states that:",
        topic: "Fluids and Pressure",
        options: [
            "Pressure applied to an enclosed fluid is transmitted equally in all directions",
            "An object immersed in fluid experiences an upthrust equal to the weight of fluid displaced",
            "Volume of gas is inversely proportional to pressure",
            "Viscous force is proportional to velocity gradient"
        ],
        answer: 0,
        explanation: "Pascal's principle states that pressure applied anywhere to a confined, incompressible fluid is transmitted equally in all directions."
    },
    {
        id: "p13",
        textHTML: "An object weighs 15 N in air and 10 N when fully submerged in water. What is the upthrust on the object?",
        topic: "Fluids and Pressure",
        options: ["5 N", "10 N", "15 N", "25 N"],
        answer: 0,
        explanation: "Upthrust = Apparent loss of weight = Weight in air - Weight in water = 15 N - 10 N = 5 N."
    },
    {
        id: "p14",
        textHTML: "The upward force exerted on an object immersed in a fluid is called:",
        topic: "Fluids and Pressure",
        options: ["Viscosity", "Surface tension", "Upthrust", "Tension"],
        answer: 2,
        explanation: "Upthrust (or buoyant force) is the net upward force exerted on a body partially or totally immersed in a fluid."
    },
    {
        id: "p15",
        textHTML: "Hooke's Law states that force is directly proportional to extension provided that the:",
        topic: "Elasticity",
        options: ["Elastic limit is not exceeded", "Temperature remains zero", "Material is rubber", "Cross-sectional area increases"],
        answer: 0,
        explanation: "Hooke's Law (F = ke) holds strictly true up to the elastic limit of the material."
    },
    {
        id: "p16",
        textHTML: "The SI unit of Young's Modulus is:",
        topic: "Elasticity",
        options: ["N m", "N m<sup>-1</sup>", "N m<sup>-2</sup>", "J m<sup>-2</sup>"],
        answer: 2,
        explanation: "Young's modulus = Stress / Strain. Since strain is dimensionless, the unit of Young's modulus is the unit of stress: N m<sup>-2</sup> (or Pascals)."
    },
    {
        id: "p17",
        textHTML: "Temperature is a measure of the average:",
        topic: "Thermodynamics",
        options: ["Potential energy of molecules", "Kinetic energy of molecules", "Total internal energy", "Latent heat"],
        answer: 1,
        explanation: "Temperature measures the average translational kinetic energy of particles in a substance."
    },
    {
        id: "p18",
        textHTML: "Convert 27&deg;C to Kelvin.",
        topic: "Thermodynamics",
        options: ["246 K", "273 K", "300 K", "327 K"],
        answer: 2,
        explanation: "T(K) = T(&deg;C) + 273 = 27 + 273 = 300 K."
    },
    {
        id: "p19",
        textHTML: "Which thermometric liquid is most suitable for measuring temperatures below -40&deg;C?",
        topic: "Thermodynamics",
        options: ["Mercury", "Alcohol", "Water", "Water-glycol mixture"],
        answer: 1,
        explanation: "Alcohol has a low freezing point (-115&deg;C) compared to mercury (-39&deg;C), making it suitable for low temperatures."
    },
    {
        id: "p20",
        textHTML: "The heat capacity of a substance is defined as the heat required to:",
        topic: "Thermal Properties",
        options: [
            "Change 1 kg of the substance from solid to liquid",
            "Raise the temperature of the entire body by 1 K",
            "Raise the temperature of 1 kg of the body by 1 K",
            "Vaporize 1 kg of liquid"
        ],
        answer: 1,
        explanation: "Heat capacity C = Q / &Delta;T is the heat needed to raise the temperature of the whole body by 1 unit (1 K or 1&deg;C)."
    },
    {
        id: "p21",
        textHTML: "Calculate the quantity of heat needed to raise 2 kg of copper from 20&deg;C to 70&deg;C. <br><em>[Specific heat capacity of copper = 400 J kg<sup>-1</sup> K<sup>-1</sup>]</em>",
        topic: "Thermal Properties",
        options: ["8,000 J", "16,000 J", "40,000 J", "56,000 J"],
        answer: 2,
        explanation: "Q = mc&Delta;T = 2 kg &times; 400 J kg<sup>-1</sup> K<sup>-1</sup> &times; (70 - 20) K = 40,000 J."
    },
    {
        id: "p22",
        textHTML: "The heat energy required to change a unit mass of solid to liquid without a temperature change is called specific latent heat of:",
        topic: "Thermal Properties",
        options: ["Vaporization", "Fusion", "Sublimation", "Condensation"],
        answer: 1,
        explanation: "Latent heat of fusion is the heat required for phase change from solid to liquid at a constant melting point."
    },
    {
        id: "p23",
        textHTML: "Heat transfer through a metal rod takes place primarily by:",
        topic: "Heat Transfer",
        options: ["Convection", "Conduction", "Radiation", "Evaporation"],
        answer: 1,
        explanation: "Conduction is the process of heat transfer through solids via lattice vibrations and free electron movement."
    },
    {
        id: "p24",
        textHTML: "Heat transfer from the Sun to the Earth occurs through:",
        topic: "Heat Transfer",
        options: ["Conduction", "Convection", "Radiation", "Refraction"],
        answer: 2,
        explanation: "Thermal radiation travels as electromagnetic waves and does not require any material medium."
    },
    {
        id: "p25",
        textHTML: "At constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure. This is:",
        topic: "Gas Laws",
        options: ["Charles's Law", "Boyle's Law", "Pressure Law", "Graham's Law"],
        answer: 1,
        explanation: "Boyle's Law states P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub> at constant temperature."
    },
    {
        id: "p26",
        textHTML: "A gas occupies 2.0 m<sup>3</sup> at 300 K. What is its volume at 600 K if pressure remains constant?",
        topic: "Gas Laws",
        options: ["1.0 m<sup>3</sup>", "2.0 m<sup>3</sup>", "4.0 m<sup>3</sup>", "8.0 m<sup>3</sup>"],
        answer: 2,
        explanation: "Charles's Law: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub> &rArr; 2.0 / 300 = V<sub>2</sub> / 600 &rArr; V<sub>2</sub> = 4.0 m<sup>3</sup>."
    },
    {
        id: "p27",
        textHTML: "Which wave type requires a material medium for propagation?",
        topic: "Waves & Sound",
        options: ["Light waves", "Radio waves", "Sound waves", "X-rays"],
        answer: 2,
        explanation: "Sound waves are mechanical longitudinal waves requiring a solid, liquid, or gas medium to travel."
    },
    {
        id: "p28",
        textHTML: "The distance between two consecutive crests or troughs of a wave is the:",
        topic: "Waves & Sound",
        options: ["Amplitude", "Frequency", "Wavelength", "Period"],
        answer: 2,
        explanation: "Wavelength (&lambda;) is defined as the distance between two successive points in phase."
    },
    {
        id: "p29",
        textHTML: "Calculate the velocity of a wave with frequency 50 Hz and wavelength 4.0 m.",
        topic: "Waves & Sound",
        options: ["12.5 m s<sup>-1</sup>", "54 m s<sup>-1</sup>", "200 m s<sup>-1</sup>", "400 m s<sup>-1</sup>"],
        answer: 2,
        explanation: "Wave equation: v = f &lambda; = 50 Hz &times; 4.0 m = 200 m s<sup>-1</sup>."
    },
    {
        id: "p30",
        textHTML: "Sound waves cannot undergo:",
        topic: "Waves & Sound",
        options: ["Reflection", "Refraction", "Diffraction", "Polarization"],
        answer: 3,
        explanation: "Polarization occurs only in transverse waves. Sound waves in air are longitudinal and cannot be polarized."
    },
    {
        id: "p31",
        textHTML: "A ship uses echo sounding to measure ocean depth. If a signal returns after 2.0 s and sound speed in water is 1500 m s<sup>-1</sup>, the depth is:",
        topic: "Waves & Sound",
        options: ["750 m", "1500 m", "3000 m", "6000 m"],
        answer: 1,
        explanation: "Distance d = (v &times; t) / 2 = (1500 m s<sup>-1</sup> &times; 2.0 s) / 2 = 1500 m."
    },
    {
        id: "p32",
        textHTML: "In electromagnetic spectrum, which radiation has the shortest wavelength?",
        topic: "Electromagnetic Spectrum",
        options: ["Radio waves", "Microwaves", "Ultraviolet rays", "Gamma rays"],
        answer: 3,
        explanation: "Gamma rays have the highest frequency and shortest wavelength in the electromagnetic spectrum."
    },
    {
        id: "p33",
        textHTML: "Image formed by a plane mirror is always:",
        topic: "Optics",
        options: ["Real and inverted", "Virtual and erect", "Real and magnified", "Virtual and inverted"],
        answer: 1,
        explanation: "Plane mirrors produce virtual, erect, laterally inverted images equal in size to the object."
    },
    {
        id: "p34",
        textHTML: "The phenomenon responsible for the bending of light as it passes from one medium to another is:",
        topic: "Optics",
        options: ["Reflection", "Refraction", "Diffraction", "Dispersion"],
        answer: 1,
        explanation: "Refraction occurs due to changes in the speed of light when transitioning between media of different optical densities."
    },
    {
        id: "p35",
        textHTML: "The refractive index of glass is 1.5. Calculate the speed of light in glass. <br><em>[Speed of light in air = 3.0 &times; 10<sup>8</sup> m s<sup>-1</sup>]</em>",
        topic: "Optics",
        options: ["1.5 &times; 10<sup>8</sup> m s<sup>-1</sup>", "2.0 &times; 10<sup>8</sup> m s<sup>-1</sup>", "3.0 &times; 10<sup>8</sup> m s<sup>-1</sup>", "4.5 &times; 10<sup>8</sup> m s<sup>-1</sup>"],
        answer: 1,
        explanation: "Refractive index n = c / v &rArr; 1.5 = (3.0 &times; 10<sup>8</sup>) / v &rArr; v = 2.0 &times; 10<sup>8</sup> m s<sup>-1</sup>."
    },
    {
        id: "p36",
        textHTML: "Total internal reflection occurs when light travels from:",
        topic: "Optics",
        options: [
            "Optically denser to rarer medium at angle greater than critical angle",
            "Optically rarer to denser medium at critical angle",
            "Vacuum into glass at 90&deg;",
            "Water to air at angle less than critical angle"
        ],
        answer: 0,
        explanation: "Total internal reflection occurs when light travels from a denser to a less dense medium at an incident angle greater than the critical angle."
    },
    {
        id: "p37",
        textHTML: "A focal length of a convex lens is 20 cm. What is its power in Dioptres?",
        topic: "Optics",
        options: ["+0.05 D", "+2.0 D", "+5.0 D", "+20 D"],
        answer: 2,
        explanation: "Power P = 1 / f(in meters). f = 20 cm = 0.2 m. <br>P = 1 / 0.2 = +5.0 D."
    },
    {
        id: "p38",
        textHTML: "Myopia (short-sightedness) is corrected using a:",
        topic: "Optics",
        options: ["Biconvex lens", "Concave lens", "Cylindrical lens", "Plano-convex lens"],
        answer: 1,
        explanation: "Myopia causes light rays to focus in front of the retina. Diverging (concave) lenses spread light rays so they hit the retina accurately."
    },
    {
        id: "p39",
        textHTML: "The splitting of white light into its component colors by a glass prism is:",
        topic: "Optics",
        options: ["Diffraction", "Interference", "Dispersion", "Polarization"],
        answer: 2,
        explanation: "Dispersion occurs because different wavelengths (colors) of light travel at slightly different speeds in glass and refract by different amounts."
    },
    {
        id: "p40",
        textHTML: "The SI unit of electric charge is:",
        topic: "Electrostatics",
        options: ["Ampere", "Volt", "Coulomb", "Ohm"],
        answer: 2,
        explanation: "Electric charge is measured in Coulombs (C), where 1 C = 1 Ampere-second."
    },
    {
        id: "p41",
        textHTML: "Coulomb's Law states that electrostatic force between two charges is:",
        topic: "Electrostatics",
        options: [
            "Directly proportional to product of charges and inversely proportional to square of separation",
            "Inversely proportional to product of charges",
            "Directly proportional to distance between charges",
            "Independent of dielectric constant"
        ],
        answer: 0,
        explanation: "Coulomb's Law F = k(q<sub>1</sub>q<sub>2</sub> / r<sup>2</sup>)."
    },
    {
        id: "p42",
        textHTML: "Ohm's Law is expressed mathematically as:",
        topic: "Current Electricity",
        options: ["V = I / R", "V = IR", "I = V<sup>2</sup>R", "R = VI"],
        answer: 1,
        explanation: "Ohm's Law states voltage V is directly proportional to current I, yielding V = IR."
    },
    {
        id: "p43",
        textHTML: "Three resistors of 2 &Omega;, 3 &Omega;, and 6 &Omega; are connected in parallel. Calculate equivalent resistance.",
        topic: "Current Electricity",
        options: ["1 &Omega;", "3 &Omega;", "11 &Omega;", "0.5 &Omega;"],
        answer: 0,
        explanation: "1/R<sub>eq</sub> = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 6/6 = 1 &Omega; &rArr; R<sub>eq</sub> = 1 &Omega;."
    },
    {
        id: "p44",
        textHTML: "Calculate electrical energy consumed by a 100 W bulb operating for 5 hours.",
        topic: "Current Electricity",
        options: ["20 Wh", "500 Wh", "1000 Wh", "5000 Wh"],
        answer: 1,
        explanation: "Energy = Power &times; Time = 100 W &times; 5 h = 500 Wh (or 0.5 kWh)."
    },
    {
        id: "p45",
        textHTML: "The device used to protect electrical appliances against excessive current flow is:",
        topic: "Current Electricity",
        options: ["Rheostat", "Transformer", "Fuse", "Capacitor"],
        answer: 2,
        explanation: "A fuse contains a metal wire with low melting point that breaks the circuit when current exceeds safety rating."
    },
    {
        id: "p46",
        textHTML: "In a step-up transformer:",
        topic: "Electromagnetism",
        options: [
            "Secondary voltage is higher than primary voltage",
            "Secondary turns are fewer than primary turns",
            "Secondary current is higher than primary current",
            "Output power exceeds input power"
        ],
        answer: 0,
        explanation: "A step-up transformer increases voltage from primary to secondary (V<sub>s</sub> > V<sub>p</sub>) because N<sub>s</sub> > N<sub>p</sub>."
    },
    {
        id: "p47",
        textHTML: "A transformer has 100 primary turns and 500 secondary turns. If primary voltage is 120 V, secondary voltage is:",
        topic: "Electromagnetism",
        options: ["24 V", "120 V", "600 V", "1200 V"],
        answer: 2,
        explanation: "V<sub>s</sub> / V<sub>p</sub> = N<sub>s</sub> / N<sub>p</sub> &rArr; V<sub>s</sub> / 120 = 500 / 100 &rArr; V<sub>s</sub> = 5 &times; 120 = 600 V."
    },
    {
        id: "p48",
        textHTML: "Faraday's Law of Electromagnetic Induction states that induced electromotive force is proportional to:",
        topic: "Electromagnetism",
        options: [
            "Magnetic flux linked with circuit",
            "Rate of change of magnetic flux linkage",
            "Resistance of circuit",
            "Current in primary coil"
        ],
        answer: 1,
        explanation: "Induced emf &epsilon; = -d&Phi;/dt (rate of change of magnetic flux linkage)."
    },
    {
        id: "p49",
        textHTML: "Thermionic emission is the ejection of electrons from a metal surface due to:",
        topic: "Atomic & Modern Physics",
        options: ["High pressure", "Light illumination", "Heat energy", "Chemical reaction"],
        answer: 2,
        explanation: "Thermionic emission occurs when thermal energy supplied to a metal electrode overcomes the metal's work function."
    },
    {
        id: "p50",
        textHTML: "The photoelectric effect provides evidence for the:",
        topic: "Atomic & Modern Physics",
        options: ["Wave nature of light", "Particle nature of light", "Transverse nature of light", "Longitudinal nature of light"],
        answer: 1,
        explanation: "Photoelectric emission proves light behaves as discrete wave packets called photons (particle theory)."
    },
    {
        id: "p51",
        textHTML: "Calculate the energy of a photon of frequency 6.0 &times; 10<sup>14</sup> Hz. <br><em>[Planck's constant h = 6.63 &times; 10<sup>-34</sup> J s]</em>",
        topic: "Atomic & Modern Physics",
        options: ["1.1 &times; 10<sup>-48</sup> J", "3.98 &times; 10<sup>-19</sup> J", "6.63 &times; 10<sup>-34</sup> J", "4.00 &times; 10<sup>-20</sup> J"],
        answer: 1,
        explanation: "E = hf = (6.63 &times; 10<sup>-34</sup> J s) &times; (6.0 &times; 10<sup>14</sup> s<sup>-1</sup>) = 3.978 &times; 10<sup>-19</sup> J."
    },
    {
        id: "p52",
        textHTML: "Alpha particles consist of:",
        topic: "Nuclear Physics",
        options: ["Electrons", "Protons only", "Helium nuclei (2 protons, 2 neutrons)", "High energy photons"],
        answer: 2,
        explanation: "An alpha particle (&alpha;) is identical to a helium-4 nucleus, carrying a charge of +2e and mass number 4."
    },
    {
        id: "p53",
        textHTML: "Beta particles are fast-moving:",
        topic: "Nuclear Physics",
        options: ["Protons", "Neutrons", "Electrons", "Helium nuclei"],
        answer: 2,
        explanation: "Beta-minus particles (&beta;<sup>-</sup>) are high-speed electrons emitted from atomic nuclei during radioactive decay."
    },
    {
        id: "p54",
        textHTML: "Which nuclear radiation has the highest penetrating power?",
        topic: "Nuclear Physics",
        options: ["Alpha particles", "Beta particles", "Gamma rays", "Neutrons"],
        answer: 2,
        explanation: "Gamma rays are uncharged high-energy electromagnetic waves requiring dense lead or thick concrete to block."
    },
    {
        id: "p55",
        textHTML: "A radioactive element has a half-life of 4 hours. What fraction of original mass remains after 12 hours?",
        topic: "Nuclear Physics",
        options: ["1/2", "1/4", "1/8", "1/16"],
        answer: 2,
        explanation: "Number of half-lives n = 12 / 4 = 3. Fraction remaining = (1/2)<sup>3</sup> = 1/8."
    },
    {
        id: "p56",
        textHTML: "Nuclear fusion involves:",
        topic: "Nuclear Physics",
        options: [
            "Splitting of a heavy nucleus into lighter nuclei",
            "Combining light nuclei to form a heavier nucleus",
            "Emission of beta particles from unstable nucleus",
            "Absorption of neutrons by heavy nuclei"
        ],
        answer: 1,
        explanation: "Nuclear fusion combines light nuclei (such as hydrogen isotopes) under high temperature and pressure to form a heavier nucleus."
    },
    {
        id: "p57",
        textHTML: "Doping a pure intrinsic semiconductor with a trivalent element produces a(n):",
        topic: "Semiconductor Physics",
        options: ["n-type semiconductor", "p-type semiconductor", "Insulator", "Superconductor"],
        answer: 1,
        explanation: "Trivalent impurities (like boron, indium) create electron deficiencies (holes) as majority carriers, creating p-type material."
    },
    {
        id: "p58",
        textHTML: "A p-n junction diode acts as a rectifier by allowing current to flow:",
        topic: "Semiconductor Physics",
        options: ["In both directions equally", "Only when reverse biased", "In one direction only when forward biased", "Only at absolute zero"],
        answer: 2,
        explanation: "A p-n junction diode conducts electricity easily only when forward-biased, making it useful for AC-to-DC rectification."
    },
    {
        id: "p59",
        textHTML: "Which vector quantity represents displacement per unit time?",
        topic: "Kinematics",
        options: ["Speed", "Acceleration", "Velocity", "Impulse"],
        answer: 2,
        explanation: "Velocity is displacement divided by time and is a vector quantity."
    },
    {
        id: "p60",
        textHTML: "The area under a velocity-time graph represents:",
        topic: "Kinematics",
        options: ["Acceleration", "Speed", "Distance or Displacement", "Force"],
        answer: 2,
        explanation: "Integrating or taking the area under a v-t graph yields total distance/displacement covered."
    },
    {
        id: "p61",
        textHTML: "A ball thrown vertically upward reaches maximum height when its velocity is:",
        topic: "Kinematics",
        options: ["Maximum", "Zero", "Equal to g", "Half initial velocity"],
        answer: 1,
        explanation: "At peak altitude, instantaneous vertical velocity momentarily drops to 0 m s<sup>-1</sup>."
    },
    {
        id: "p62",
        textHTML: "The angle of projection that yields maximum horizontal range for a projectile is:",
        topic: "Kinematics",
        options: ["30&deg;", "45&deg;", "60&deg;", "90&deg;"],
        answer: 1,
        explanation: "Range R = (u<sup>2</sup> sin 2&theta;) / g. Maximum value occurs when sin 2&theta; = 1 &rArr; 2&theta; = 90&deg; &rArr; &theta; = 45&deg;."
    },
    {
        id: "p63",
        textHTML: "The force that keeps a body moving in a circular path directed towards the center is:",
        topic: "Circular Motion",
        options: ["Centrifugal force", "Centripetal force", "Frictional force", "Gravitational force"],
        answer: 1,
        explanation: "Centripetal force is the center-seeking force required for uniform circular motion."
    },
    {
        id: "p64",
        textHTML: "Calculate the centripetal force on a 1.0 kg mass moving at 4.0 m s<sup>-1</sup> in a circle of radius 2.0 m.",
        topic: "Circular Motion",
        options: ["2 N", "4 N", "8 N", "16 N"],
        answer: 2,
        explanation: "F<sub>c</sub> = m v<sup>2</sup> / r = (1.0 kg &times; (4.0 m s<sup>-1</sup>)<sup>2</sup>) / 2.0 m = 16 / 2 = 8 N."
    },
    {
        id: "p65",
        textHTML: "Gravitational force between two point masses is inversely proportional to:",
        topic: "Gravitation",
        options: ["Product of masses", "Sum of masses", "Square of distance between them", "Distance between them"],
        answer: 2,
        explanation: "Newton's Law of Universal Gravitation F = G(m<sub>1</sub>m<sub>2</sub> / r<sup>2</sup>)."
    },
    {
        id: "p66",
        textHTML: "The acceleration due to gravity on Earth's surface is approximately:",
        topic: "Gravitation",
        options: ["9.8 m s<sup>-2</sup>", "1.6 m s<sup>-2</sup>", "3.7 m s<sup>-2</sup>", "24.8 m s<sup>-2</sup>"],
        answer: 0,
        explanation: "Standard acceleration due to gravity on Earth is approximately 9.8 m s<sup>-2</sup> (often rounded to 10 m s<sup>-2</sup> in WAEC calculations)."
    },
    {
        id: "p67",
        textHTML: "A simple pendulum of length 1.0 m has a period of T. To double its period, length should be:",
        topic: "Simple Harmonic Motion",
        options: ["2.0 m", "4.0 m", "0.5 m", "8.0 m"],
        answer: 1,
        explanation: "Period T = 2&pi; &radic;(L / g). T &prop; &radic;L. To make T twice as large (2T), length L must be multiplied by 2<sup>2</sup> = 4."
    },
    {
        id: "p68",
        textHTML: "The maximum displacement of a particle executing simple harmonic motion from its equilibrium position is:",
        topic: "Simple Harmonic Motion",
        options: ["Wavelength", "Frequency", "Amplitude", "Phase"],
        answer: 2,
        explanation: "Amplitude is defined as the maximum displacement from mean/rest position."
    },
    {
        id: "p69",
        textHTML: "Resonance occurs when forcing frequency equals:",
        topic: "Simple Harmonic Motion",
        options: ["Zero", "Natural frequency of oscillating system", "Double natural frequency", "Infinite frequency"],
        answer: 1,
        explanation: "Resonance takes place when driven frequency matches natural frequency, maximizing amplitude of vibration."
    },
    {
        id: "p70",
        textHTML: "Surface tension in liquids is caused by:",
        topic: "Fluid Properties",
        options: ["Cohesive forces between liquid molecules", "Adhesive forces between fluid and glass", "Viscous forces", "Atmospheric pressure"],
        answer: 0,
        explanation: "Surface tension arises from cohesive forces between liquid molecules pulling inward at the free surface."
    },
    {
        id: "p71",
        textHTML: "Capillary action causes water to rise in a narrow tube because:",
        topic: "Fluid Properties",
        options: [
            "Adhesive force between water and glass exceeds cohesive force between water molecules",
            "Cohesive force exceeds adhesive force",
            "Viscosity of water is high",
            "Water density is low"
        ],
        answer: 0,
        explanation: "Water wets glass because adhesion (water-glass) is stronger than cohesion (water-water), causing capillary rise."
    },
    {
        id: "p72",
        textHTML: "The terminal velocity of a small sphere falling through a viscous fluid is reached when net force is:",
        topic: "Fluid Properties",
        options: ["Maximum", "Equal to weight only", "Zero", "Equal to upthrust"],
        answer: 2,
        explanation: "At terminal velocity, downward weight equals upward forces (Upthrust + Viscous drag), so net force and acceleration equal zero."
    },
    {
        id: "p73",
        textHTML: "Bernoulli's Principle states that in a fluid stream, where speed is high:",
        topic: "Fluid Properties",
        options: ["Pressure is high", "Pressure is low", "Density increases", "Temperature vanishes"],
        answer: 1,
        explanation: "Bernoulli's Principle: Increase in fluid speed occurs simultaneously with a decrease in internal fluid pressure."
    },
    {
        id: "p74",
        textHTML: "Linear expansivity &alpha; is related to cubical expansivity &gamma; by:",
        topic: "Thermal Expansion",
        options: ["&gamma; = &alpha;", "&gamma; = 2&alpha;", "&gamma; = 3&alpha;", "&gamma; = &alpha; / 3"],
        answer: 2,
        explanation: "Volume expansivity is three times linear expansivity (&gamma; = 3&alpha;)."
    },
    {
        id: "p75",
        textHTML: "The anomalous expansion of water occurs between:",
        topic: "Thermal Expansion",
        options: ["-4&deg;C and 0&deg;C", "0&deg;C and 4&deg;C", "4&deg;C and 100&deg;C", "100&deg;C and 104&deg;C"],
        answer: 1,
        explanation: "Water contracts when heated from 0&deg;C to 4&deg;C, reaching its maximum density at 4&deg;C."
    },
    {
        id: "p76",
        textHTML: "Boiling point of a liquid increases when:",
        topic: "Thermodynamics",
        options: ["External pressure increases", "External pressure decreases", "Impurities are removed", "Container volume doubles"],
        answer: 0,
        explanation: "Boiling occurs when saturated vapour pressure equals external atmospheric pressure. Increasing external pressure elevates the boiling point."
    },
    {
        id: "p77",
        textHTML: "A polished silver surface is a:",
        topic: "Heat Transfer",
        options: ["Good absorber and good emitter of radiant heat", "Poor absorber and poor emitter of radiant heat", "Good absorber but poor emitter", "Poor reflector"],
        answer: 1,
        explanation: "Polished light-colored surfaces are excellent reflectors, making them poor absorbers and poor emitters of heat radiation."
    },
    {
        id: "p78",
        textHTML: "The principal focus of a concave mirror is the point where light rays parallel to principal axis:",
        topic: "Optics",
        options: ["Diverge after reflection", "Converge after reflection", "Pass through without deviation", "Are completely absorbed"],
        answer: 1,
        explanation: "A concave mirror is a converging mirror; parallel incident rays reflect through its focal point."
    },
    {
        id: "p79",
        textHTML: "A concave mirror has a focal length of 15 cm. An object placed 30 cm from mirror forms image at:",
        topic: "Optics",
        options: ["10 cm", "15 cm", "30 cm", "60 cm"],
        answer: 2,
        explanation: "Mirror formula 1/f = 1/u + 1/v &rArr; 1/15 = 1/30 + 1/v &rArr; 1/v = 1/15 - 1/30 = 1/30 &rArr; v = 30 cm."
    },
    {
        id: "p80",
        textHTML: "Magnification produced by a mirror is calculated using:",
        topic: "Optics",
        options: ["Image distance / Object distance", "Object distance / Image distance", "Focal length &times; Object distance", "Image distance &times; Focal length"],
        answer: 0,
        explanation: "Magnification m = Image height / Object height = Image distance (v) / Object distance (u)."
    },
    {
        id: "p81",
        textHTML: "Critical angle for a glass-air interface is 42&deg;. Calculate refractive index of glass. <br><em>[sin 42&deg; = 0.6691]</em>",
        topic: "Optics",
        options: ["0.67", "1.33", "1.49", "1.50"],
        answer: 2,
        explanation: "n = 1 / sin(c) = 1 / sin(42&deg;) = 1 / 0.6691 &approx; 1.49."
    },
    {
        id: "p82",
        textHTML: "Astronomical telescope in normal adjustment consists of two convex lenses. Final image formed is:",
        topic: "Optics",
        options: ["Real and erect", "Virtual and inverted", "Virtual and erect", "Real and inverted"],
        answer: 1,
        explanation: "In an astronomical telescope, the objective forms a real inverted image, which the eyepiece magnifies into a final virtual inverted image."
    },
    {
        id: "p83",
        textHTML: "The pitch of a musical note depends on its:",
        topic: "Waves & Sound",
        options: ["Amplitude", "Frequency", "Overtones", "Intensity"],
        answer: 1,
        explanation: "Pitch is the brain's perception of sound wave frequency (higher frequency = higher pitch)."
    },
    {
        id: "p84",
        textHTML: "Loudness of sound depends on wave:",
        topic: "Waves & Sound",
        options: ["Frequency", "Speed", "Amplitude", "Wavelength"],
        answer: 2,
        explanation: "Loudness is proportional to the square of sound wave amplitude."
    },
    {
        id: "p85",
        textHTML: "Overtones determine the:",
        topic: "Waves & Sound",
        options: ["Pitch of sound", "Quality or timbre of sound", "Loudness of sound", "Speed of sound"],
        answer: 1,
        explanation: "Quality or timbre depends on the number and relative intensities of overtones (harmonics) present."
    },
    {
        id: "p86",
        textHTML: "The fundamental frequency of a stretched string of length L, tension T, mass per unit length &mu; is:",
        topic: "Waves & Sound",
        options: ["f = &frac12;L &radic;(T / &mu;)", "f = 2L &radic;(&mu; / T)", "f = L &radic;(T &mu;)", "f = &frac12; &radic;(T / &mu;)"],
        answer: 0,
        explanation: "Fundamental frequency of stretched string f<sub>0</sub> = (1 / 2L) &radic;(T / &mu;)."
    },
    {
        id: "p87",
        textHTML: "Beat frequency produced by two tuning forks of frequencies 256 Hz and 260 Hz sounding together is:",
        topic: "Waves & Sound",
        options: ["2 Hz", "4 Hz", "258 Hz", "516 Hz"],
        answer: 1,
        explanation: "Beat frequency f<sub>beat</sub> = |f<sub>1</sub> - f<sub>2</sub>| = |260 - 256| = 4 Hz."
    },
    {
        id: "p88",
        textHTML: "Gold leaf electroscope is used to:",
        topic: "Electrostatics",
        options: ["Measure current", "Detect presence and nature of electric charge", "Store electric charge", "Measure resistance"],
        answer: 1,
        explanation: "Electroscope detects presence, sign (+/-), and relative magnitude of electrostatic charge."
    },
    {
        id: "p89",
        textHTML: "Capacitance of a parallel plate capacitor increases when plate separation:",
        topic: "Electrostatics",
        options: ["Increases", "Decreases", "Remains constant", "Is doubled"],
        answer: 1,
        explanation: "Capacitance C = (&epsilon; A) / d. Capacitance is inversely proportional to plate distance d."
    },
    {
        id: "p90",
        textHTML: "Unit of electrical capacitance is the:",
        topic: "Electrostatics",
        options: ["Henry", "Farad", "Tesla", "Weber"],
        answer: 1,
        explanation: "Capacitance is measured in Farads (F), where 1 F = 1 Coulomb per Volt."
    },
    {
        id: "p91",
        textHTML: "Internal resistance of a cell causes terminal voltage to be less than emf when:",
        topic: "Current Electricity",
        options: ["Cell is on open circuit", "Current is drawn from cell", "Cell is being charged", "Resistance is infinite"],
        answer: 1,
        explanation: "Terminal voltage V = E - Ir. When current I flows, internal voltage drop Ir reduces V below emf E."
    },
    {
        id: "p92",
        textHTML: "A 12 V battery delivers 2 A to a resistor. Calculate internal resistance if total circuit resistance is 6 &Omega;.",
        topic: "Current Electricity",
        options: ["0 &Omega;", "1 &Omega;", "2 &Omega;", "3 &Omega;"],
        answer: 0,
        explanation: "E = I(R + r) &rArr; 12 = 2(6) &rArr; 12 = 12 + 2r &rArr; r = 0 &Omega;."
    },
    {
        id: "p93",
        textHTML: "Wheatstone bridge is used for precise measurement of:",
        topic: "Current Electricity",
        options: ["High voltages", "Unknown electrical resistance", "Alternating current", "Magnetic flux"],
        answer: 1,
        explanation: "Wheatstone bridge operates on null deflection balance to accurately measure unknown resistance."
    },
    {
        id: "p94",
        textHTML: "Soft iron is used as transformer core because it has:",
        topic: "Electromagnetism",
        options: ["High retentivity and high coercivity", "Low retentivity and low hysteresis loss", "High electrical resistance", "Zero magnetic permeability"],
        answer: 1,
        explanation: "Soft iron easily magnetizes and demagnetizes, minimizing energy loss due to hysteresis in alternating magnetic fields."
    },
    {
        id: "p95",
        textHTML: "Lenz's Law is a consequence of law of conservation of:",
        topic: "Electromagnetism",
        options: ["Charge", "Momentum", "Energy", "Mass"],
        answer: 2,
        explanation: "Lenz's law ensures mechanical work done against opposing induced forces converts into electrical energy (Conservation of Energy)."
    },
    {
        id: "p96",
        textHTML: "X-rays are produced when fast-moving electrons strike a target made of:",
        topic: "Atomic & Modern Physics",
        options: ["Low atomic mass metal", "High melting point and high atomic number metal", "Semiconductor", "Liquid mercury"],
        answer: 1,
        explanation: "X-ray tube targets (like tungsten) must withstand extreme heat and feature high atomic numbers for effective decelerating conversion."
    },
    {
        id: "p97",
        textHTML: "Energy released in nuclear reactions obeys Einstein's equation:",
        topic: "Nuclear Physics",
        options: ["E = hf", "E = mc<sup>2</sup>", "E = &frac12;mv<sup>2</sup>", "E = mgh"],
        answer: 1,
        explanation: "Mass-energy equivalence equation E = &Delta;m c<sup>2</sup>, where &Delta;m is mass defect."
    },
    {
        id: "p98",
        textHTML: "In a nuclear reactor, heavy water or graphite is used as a:",
        topic: "Nuclear Physics",
        options: ["Coolant", "Moderator", "Control rod", "Shield"],
        answer: 1,
        explanation: "Moderators slow down fast fission neutrons to thermal energy speeds suitable for sustaining chain reactions."
    },
    {
        id: "p99",
        textHTML: "Control rods in nuclear reactors are made of materials like cadmium or boron because they:",
        topic: "Nuclear Physics",
        options: ["Produce neutrons", "Absorb excess neutrons", "Accelerate neutrons", "Reflect radiation"],
        answer: 1,
        explanation: "Cadmium/Boron absorb neutrons without undergoing fission, controlling the rate of chain reaction."
    },
    {
        id: "p100",
        textHTML: "Which component converts alternating current (AC) to direct current (DC)?",
        topic: "Semiconductor Physics",
        options: ["Transistor", "Transformer", "Rectifier (Diode)", "Inductor"],
        answer: 2,
        explanation: "Rectifiers utilize semiconductor diodes to restrict current flow to one direction, converting AC signals into DC."
    }
];