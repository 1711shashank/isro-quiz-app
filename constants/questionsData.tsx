export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    subject: 'spacecrafts' | 'launchers' | 'satellites';
    difficulty: 'easy' | 'medium' | 'hard';
}

export const questionsData: Question[] = [
    // Spacecrafts - Easy
    {
        id: 1,
        question: "What does ISRO stand for?",
        options: [
            "Indian Space Research Organisation",
            "International Space Research Organisation",
            "Indian Space Rocket Organisation",
            "International Space Rocket Organisation"
        ],
        correctAnswer: 0,
        explanation: "ISRO stands for Indian Space Research Organisation, India's national space agency.",
        subject: "spacecrafts",
        difficulty: "easy"
    },
    {
        id: 2,
        question: "Which was India's first satellite?",
        options: [
            "Aryabhata",
            "Bhaskara",
            "Rohini",
            "INSAT-1A"
        ],
        correctAnswer: 0,
        explanation: "Aryabhata was India's first satellite, launched on April 19, 1975.",
        subject: "spacecrafts",
        difficulty: "easy"
    },
    {
        id: 3,
        question: "What is the name of India's Mars orbiter mission?",
        options: [
            "Mangalyaan",
            "Chandrayaan",
            "Aditya",
            "Gaganyaan"
        ],
        correctAnswer: 0,
        explanation: "Mangalyaan (Mars Orbiter Mission) was India's first interplanetary mission to Mars.",
        subject: "spacecrafts",
        difficulty: "easy"
    },
    {
        id: 4,
        question: "Which mission made India the first country to reach Mars orbit in its first attempt?",
        options: [
            "Mangalyaan",
            "Chandrayaan-1",
            "Chandrayaan-2",
            "Chandrayaan-3"
        ],
        correctAnswer: 0,
        explanation: "Mangalyaan made India the first country to successfully reach Mars orbit in its maiden attempt.",
        subject: "spacecrafts",
        difficulty: "easy"
    },
    {
        id: 5,
        question: "What is the name of India's lunar exploration program?",
        options: [
            "Chandrayaan",
            "Mangalyaan",
            "Aditya",
            "Gaganyaan"
        ],
        correctAnswer: 0,
        explanation: "Chandrayaan is India's lunar exploration program, with multiple missions to the Moon.",
        subject: "spacecrafts",
        difficulty: "easy"
    },

    // Spacecrafts - Medium
    {
        id: 6,
        question: "Which Chandrayaan mission successfully landed on the Moon's south pole?",
        options: [
            "Chandrayaan-3",
            "Chandrayaan-2",
            "Chandrayaan-1",
            "Chandrayaan-4"
        ],
        correctAnswer: 0,
        explanation: "Chandrayaan-3 successfully landed on the Moon's south pole on August 23, 2023.",
        subject: "spacecrafts",
        difficulty: "medium"
    },
    {
        id: 7,
        question: "What was the primary objective of the Chandrayaan-1 mission?",
        options: [
            "To search for water on the Moon",
            "To land on the Moon",
            "To study Mars",
            "To study the Sun"
        ],
        correctAnswer: 0,
        explanation: "Chandrayaan-1's primary objective was to search for water on the Moon and map its surface.",
        subject: "spacecrafts",
        difficulty: "medium"
    },
    {
        id: 8,
        question: "Which ISRO mission is designed to study the Sun?",
        options: [
            "Aditya-L1",
            "Chandrayaan-3",
            "Mangalyaan",
            "Gaganyaan"
        ],
        correctAnswer: 0,
        explanation: "Aditya-L1 is ISRO's first dedicated solar mission to study the Sun's corona and solar wind.",
        subject: "spacecrafts",
        difficulty: "medium"
    },
    {
        id: 9,
        question: "What is the name of India's first human spaceflight program?",
        options: [
            "Gaganyaan",
            "Mangalyaan",
            "Chandrayaan",
            "Aditya"
        ],
        correctAnswer: 0,
        explanation: "Gaganyaan is India's first human spaceflight program, aiming to send Indian astronauts to space.",
        subject: "spacecrafts",
        difficulty: "medium"
    },
    {
        id: 10,
        question: "Which ISRO mission discovered water molecules on the Moon?",
        options: [
            "Chandrayaan-1",
            "Chandrayaan-2",
            "Chandrayaan-3",
            "Mangalyaan"
        ],
        correctAnswer: 0,
        explanation: "Chandrayaan-1 discovered water molecules on the Moon's surface using its Moon Impact Probe.",
        subject: "spacecrafts",
        difficulty: "medium"
    },

    // Spacecrafts - Hard
    {
        id: 11,
        question: "What is the name of the lander in Chandrayaan-3 mission?",
        options: [
            "Vikram",
            "Pragyan",
            "Aditya",
            "Mangalyaan"
        ],
        correctAnswer: 0,
        explanation: "Vikram was the name of the lander in Chandrayaan-3 mission that successfully landed on the Moon.",
        subject: "spacecrafts",
        difficulty: "hard"
    },
    {
        id: 12,
        question: "Which ISRO mission was launched to study Venus?",
        options: [
            "Shukrayaan-1",
            "Mangalyaan",
            "Chandrayaan-1",
            "Aditya-L1"
        ],
        correctAnswer: 0,
        explanation: "Shukrayaan-1 is ISRO's planned mission to study Venus, scheduled for launch in 2024-2025.",
        subject: "spacecrafts",
        difficulty: "hard"
    },
    {
        id: 13,
        question: "What is the name of the rover in Chandrayaan-3 mission?",
        options: [
            "Pragyan",
            "Vikram",
            "Aditya",
            "Mangalyaan"
        ],
        correctAnswer: 0,
        explanation: "Pragyan was the name of the rover in Chandrayaan-3 mission that explored the Moon's surface.",
        subject: "spacecrafts",
        difficulty: "hard"
    },

    // Launch Vehicles - Easy
    {
        id: 14,
        question: "What is the name of ISRO's most powerful launch vehicle?",
        options: [
            "GSLV Mk III",
            "PSLV",
            "GSLV",
            "ASLV"
        ],
        correctAnswer: 0,
        explanation: "GSLV Mk III (now called LVM3) is ISRO's most powerful launch vehicle.",
        subject: "launchers",
        difficulty: "easy"
    },
    {
        id: 15,
        question: "Which launch vehicle is known as ISRO's workhorse?",
        options: [
            "PSLV",
            "GSLV",
            "GSLV Mk III",
            "ASLV"
        ],
        correctAnswer: 0,
        explanation: "PSLV (Polar Satellite Launch Vehicle) is known as ISRO's workhorse for its reliability.",
        subject: "launchers",
        difficulty: "easy"
    },
    {
        id: 16,
        question: "What does PSLV stand for?",
        options: [
            "Polar Satellite Launch Vehicle",
            "Primary Satellite Launch Vehicle",
            "Powerful Satellite Launch Vehicle",
            "Precision Satellite Launch Vehicle"
        ],
        correctAnswer: 0,
        explanation: "PSLV stands for Polar Satellite Launch Vehicle, used for launching satellites into polar orbits.",
        subject: "launchers",
        difficulty: "easy"
    },
    {
        id: 17,
        question: "What does GSLV stand for?",
        options: [
            "Geosynchronous Satellite Launch Vehicle",
            "Geographic Satellite Launch Vehicle",
            "Global Satellite Launch Vehicle",
            "Geocentric Satellite Launch Vehicle"
        ],
        correctAnswer: 0,
        explanation: "GSLV stands for Geosynchronous Satellite Launch Vehicle, used for launching satellites to geosynchronous orbits.",
        subject: "launchers",
        difficulty: "easy"
    },
    {
        id: 18,
        question: "Which launch vehicle was used for the Chandrayaan-3 mission?",
        options: [
            "LVM3",
            "PSLV",
            "GSLV",
            "ASLV"
        ],
        correctAnswer: 0,
        explanation: "LVM3 (formerly GSLV Mk III) was used to launch the Chandrayaan-3 mission.",
        subject: "launchers",
        difficulty: "easy"
    },

    // Launch Vehicles - Medium
    {
        id: 19,
        question: "What is the payload capacity of PSLV to Low Earth Orbit?",
        options: [
            "3,800 kg",
            "2,500 kg",
            "5,000 kg",
            "1,500 kg"
        ],
        correctAnswer: 0,
        explanation: "PSLV has a payload capacity of 3,800 kg to Low Earth Orbit (LEO).",
        subject: "launchers",
        difficulty: "medium"
    },
    {
        id: 20,
        question: "Which launch vehicle was used for the Mangalyaan mission?",
        options: [
            "PSLV-XL",
            "GSLV Mk II",
            "LVM3",
            "ASLV"
        ],
        correctAnswer: 0,
        explanation: "PSLV-XL (Polar Satellite Launch Vehicle - eXtended) was used for the Mangalyaan mission.",
        subject: "launchers",
        difficulty: "medium"
    },
    {
        id: 21,
        question: "What is the payload capacity of LVM3 to Geosynchronous Transfer Orbit?",
        options: [
            "4,000 kg",
            "2,500 kg",
            "6,000 kg",
            "3,000 kg"
        ],
        correctAnswer: 0,
        explanation: "LVM3 has a payload capacity of 4,000 kg to Geosynchronous Transfer Orbit (GTO).",
        subject: "launchers",
        difficulty: "medium"
    },
    {
        id: 22,
        question: "Which launch vehicle is used for small satellite launches?",
        options: [
            "SSLV",
            "PSLV",
            "GSLV",
            "LVM3"
        ],
        correctAnswer: 0,
        explanation: "SSLV (Small Satellite Launch Vehicle) is designed for launching small satellites.",
        subject: "launchers",
        difficulty: "medium"
    },
    {
        id: 23,
        question: "What is the full form of LVM3?",
        options: [
            "Launch Vehicle Mark 3",
            "Large Vehicle Mark 3",
            "Light Vehicle Mark 3",
            "Lunar Vehicle Mark 3"
        ],
        correctAnswer: 0,
        explanation: "LVM3 stands for Launch Vehicle Mark 3, formerly known as GSLV Mk III.",
        subject: "launchers",
        difficulty: "medium"
    },

    // Launch Vehicles - Hard
    {
        id: 24,
        question: "Which launch vehicle was used for India's first nuclear test satellite?",
        options: [
            "SLV-3",
            "ASLV",
            "PSLV",
            "GSLV"
        ],
        correctAnswer: 0,
        explanation: "SLV-3 (Satellite Launch Vehicle-3) was used for India's first nuclear test satellite Rohini.",
        subject: "launchers",
        difficulty: "hard"
    },
    {
        id: 25,
        question: "What is the payload capacity of SSLV to Low Earth Orbit?",
        options: [
            "500 kg",
            "1,000 kg",
            "300 kg",
            "750 kg"
        ],
        correctAnswer: 0,
        explanation: "SSLV has a payload capacity of 500 kg to Low Earth Orbit (LEO).",
        subject: "launchers",
        difficulty: "hard"
    },
    {
        id: 26,
        question: "Which launch vehicle was used for the Aditya-L1 mission?",
        options: [
            "PSLV-XL",
            "LVM3",
            "GSLV Mk II",
            "SSLV"
        ],
        correctAnswer: 0,
        explanation: "PSLV-XL was used for the Aditya-L1 solar mission launch.",
        subject: "launchers",
        difficulty: "hard"
    },

    // Customer Satellites - Easy
    {
        id: 27,
        question: "What is the name of India's first communication satellite?",
        options: [
            "INSAT-1A",
            "Aryabhata",
            "Bhaskara",
            "Rohini"
        ],
        correctAnswer: 0,
        explanation: "INSAT-1A was India's first communication satellite, launched in 1982.",
        subject: "satellites",
        difficulty: "easy"
    },
    {
        id: 28,
        question: "Which satellite series provides weather forecasting services?",
        options: [
            "INSAT",
            "GSAT",
            "CARTOSAT",
            "RESOURCESAT"
        ],
        correctAnswer: 0,
        explanation: "INSAT (Indian National Satellite) series provides weather forecasting and communication services.",
        subject: "satellites",
        difficulty: "easy"
    },
    {
        id: 29,
        question: "What is the name of India's navigation satellite system?",
        options: [
            "NAVIC",
            "GPS",
            "GLONASS",
            "GALILEO"
        ],
        correctAnswer: 0,
        explanation: "NAVIC (Navigation with Indian Constellation) is India's regional navigation satellite system.",
        subject: "satellites",
        difficulty: "easy"
    },
    {
        id: 30,
        question: "Which satellite series is used for Earth observation?",
        options: [
            "CARTOSAT",
            "INSAT",
            "GSAT",
            "NAVIC"
        ],
        correctAnswer: 0,
        explanation: "CARTOSAT series satellites are used for Earth observation and cartographic applications.",
        subject: "satellites",
        difficulty: "easy"
    },
    {
        id: 31,
        question: "What does GSAT stand for?",
        options: [
            "Geosynchronous Satellite",
            "Global Satellite",
            "Geographic Satellite",
            "Geocentric Satellite"
        ],
        correctAnswer: 0,
        explanation: "GSAT stands for Geosynchronous Satellite, used for communication and broadcasting services.",
        subject: "satellites",
        difficulty: "easy"
    },

    // Customer Satellites - Medium
    {
        id: 32,
        question: "How many satellites are in the NAVIC constellation?",
        options: [
            "7",
            "5",
            "9",
            "11"
        ],
        correctAnswer: 0,
        explanation: "NAVIC constellation consists of 7 satellites - 3 in geostationary orbit and 4 in geosynchronous orbit.",
        subject: "satellites",
        difficulty: "medium"
    },
    {
        id: 33,
        question: "Which satellite provides high-resolution imaging for cartography?",
        options: [
            "CARTOSAT-3",
            "INSAT-3D",
            "GSAT-30",
            "RESOURCESAT-2"
        ],
        correctAnswer: 0,
        explanation: "CARTOSAT-3 provides high-resolution imaging with 25cm resolution for cartographic applications.",
        subject: "satellites",
        difficulty: "medium"
    },
    {
        id: 34,
        question: "What is the coverage area of NAVIC system?",
        options: [
            "India and surrounding region",
            "Global",
            "Asia-Pacific",
            "South Asia"
        ],
        correctAnswer: 0,
        explanation: "NAVIC provides coverage over India and surrounding region extending up to 1500 km from Indian boundary.",
        subject: "satellites",
        difficulty: "medium"
    },
    {
        id: 35,
        question: "Which satellite series is used for resource monitoring?",
        options: [
            "RESOURCESAT",
            "CARTOSAT",
            "INSAT",
            "GSAT"
        ],
        correctAnswer: 0,
        explanation: "RESOURCESAT series is used for resource monitoring, agriculture, and environmental applications.",
        subject: "satellites",
        difficulty: "medium"
    },
    {
        id: 36,
        question: "What is the primary purpose of INSAT satellites?",
        options: [
            "Communication and weather monitoring",
            "Earth observation",
            "Navigation",
            "Scientific research"
        ],
        correctAnswer: 0,
        explanation: "INSAT satellites are primarily used for communication, broadcasting, and weather monitoring services.",
        subject: "satellites",
        difficulty: "medium"
    },

    // Customer Satellites - Hard
    {
        id: 37,
        question: "Which satellite provides real-time weather data and cyclone tracking?",
        options: [
            "INSAT-3D",
            "CARTOSAT-3",
            "GSAT-30",
            "RESOURCESAT-2"
        ],
        correctAnswer: 0,
        explanation: "INSAT-3D provides real-time weather data, cyclone tracking, and atmospheric monitoring.",
        subject: "satellites",
        difficulty: "hard"
    },
    {
        id: 38,
        question: "What is the resolution of CARTOSAT-3 satellite?",
        options: [
            "25 cm",
            "50 cm",
            "1 meter",
            "2 meters"
        ],
        correctAnswer: 0,
        explanation: "CARTOSAT-3 provides panchromatic imagery with 25 cm resolution, making it one of the highest resolution civilian satellites.",
        subject: "satellites",
        difficulty: "hard"
    },
    {
        id: 39,
        question: "Which satellite was launched for studying the Earth's atmosphere?",
        options: [
            "SCATSAT-1",
            "INSAT-3D",
            "CARTOSAT-3",
            "GSAT-30"
        ],
        correctAnswer: 0,
        explanation: "SCATSAT-1 was launched to study wind patterns and atmospheric conditions over the oceans.",
        subject: "satellites",
        difficulty: "hard"
    },
    {
        id: 40,
        question: "What is the orbital altitude of NAVIC satellites?",
        options: [
            "36,000 km",
            "500 km",
            "800 km",
            "20,000 km"
        ],
        correctAnswer: 0,
        explanation: "NAVIC satellites operate at an altitude of approximately 36,000 km in geostationary and geosynchronous orbits.",
        subject: "satellites",
        difficulty: "hard"
    }
];
