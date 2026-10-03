// Generated from Departmentwise Supervisorwise and Yearwise PhD Awarded.xlsx
// Total 249 PhDs awarded across 15 Departments and 89 Supervisors (2016-2026)

export interface PhDAwardedRecord {
  id: number;
  departmentCode: string;
  departmentName: string;
  instituteSlug: string;
  supervisor: string;
  yearly: Record<number, number>;
  grandTotal: number;
}

export const PHD_AWARDED_YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export const PHD_AWARDED_DATA: PhDAwardedRecord[] = [
  {
    "id": 1,
    "departmentCode": "CSE",
    "departmentName": "Computer Science & Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Bineet Kumar Gupta",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 1,
      "2019": 1,
      "2020": 1,
      "2021": 3,
      "2022": 1,
      "2023": 2,
      "2024": 3,
      "2025": 2,
      "2026": 1
    },
    "grandTotal": 15
  },
  {
    "id": 2,
    "departmentCode": "CSE",
    "departmentName": "Computer Science & Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Nitya Nand Dwivedi",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 3,
    "departmentCode": "CSE",
    "departmentName": "Computer Science & Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Rajeev Kumar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 4,
    "departmentCode": "CSE",
    "departmentName": "Computer Science & Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Satya Bhushan Verma",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 2,
      "2026": 2
    },
    "grandTotal": 4
  },
  {
    "id": 5,
    "departmentCode": "CSE",
    "departmentName": "Computer Science & Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Shalini Agarwal",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 1,
      "2021": 0,
      "2022": 1,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 6,
    "departmentCode": "CSE",
    "departmentName": "Computer Science & Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Taskeen Zaidi",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 1,
      "2020": 0,
      "2021": 1,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 7,
    "departmentCode": "Chy",
    "departmentName": "Chemistry (Chemical Sciences)",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Prof. (Dr.) Ravi Kant",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 8,
    "departmentCode": "Chy",
    "departmentName": "Chemistry (Chemical Sciences)",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Prof.(Dr.) Krishna Srivastava",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 2,
      "2021": 1,
      "2022": 1,
      "2023": 0,
      "2024": 0,
      "2025": 1,
      "2026": 1
    },
    "grandTotal": 6
  },
  {
    "id": 9,
    "departmentCode": "Civil",
    "departmentName": "Civil Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Rajendra Kumar Srivastava",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 1,
      "2020": 1,
      "2021": 0,
      "2022": 1,
      "2023": 4,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 7
  },
  {
    "id": 10,
    "departmentCode": "Civil",
    "departmentName": "Civil Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Prof.(Dr.) Abhishek Saxena",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 1,
      "2020": 1,
      "2021": 0,
      "2022": 1,
      "2023": 2,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 5
  },
  {
    "id": 11,
    "departmentCode": "ECE",
    "departmentName": "Electronics & Communication Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Prof. (Dr.) Alkesh Agrawal",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 1,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 12,
    "departmentCode": "ECE",
    "departmentName": "Electronics & Communication Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Prof.(Dr.) Mukul Misra",
    "yearly": {
      "2016": 0,
      "2017": 1,
      "2018": 0,
      "2019": 1,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 13,
    "departmentCode": "EE",
    "departmentName": "Electrical Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. R. S. Bajpai",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 1,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 2
  },
  {
    "id": 14,
    "departmentCode": "EE",
    "departmentName": "Electrical Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Shikha Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 1,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 15,
    "departmentCode": "EE",
    "departmentName": "Electrical Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Dr. Sunil Kumar Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 16,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Anil Kumar (Sociology)",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 3,
      "2026": 1
    },
    "grandTotal": 4
  },
  {
    "id": 17,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Anil Kumar (Political Science)",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 2
    },
    "grandTotal": 2
  },
  {
    "id": 18,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Arun Kumar Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 19,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Geetanjali Srivastava",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 1,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 20,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Jitendra K. Yadav",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 21,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Manjari Kureel",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 22,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Priyanka Shukla",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 1,
      "2021": 2,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 3
  },
  {
    "id": 23,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Ram Pratap Yadav",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 1,
      "2026": 2
    },
    "grandTotal": 3
  },
  {
    "id": 24,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Rashmi Saxena",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 25,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Shilpa Shukla",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 26,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Shweta Shukla",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 27,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Suneel Deepak",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 28,
    "departmentCode": "HSS",
    "departmentName": "Humanities and Social Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Prof. (Dr.) Amar Pal Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 2,
      "2022": 1,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 2
    },
    "grandTotal": 6
  },
  {
    "id": 29,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. Devendra Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 30,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. Mohd. Imran",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 31,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. Neeraj Gupta",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 32,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. Nishu Mittal",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 33,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. P K Srivastava",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 1,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 34,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. Sachidanand Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 1,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 35,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. Siddharth Vats",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 1,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 36,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. Sunil Kumar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 1,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 37,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr. Tanvi Jain",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 1,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 3
  },
  {
    "id": 38,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr.Divya Gupta",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 3,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 3
  },
  {
    "id": 39,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr.Garima Gupta",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 40,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Dr.Sapna Sharma",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 41,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Prof. (Dr.) Neelam Misra",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 42,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Prof. (Dr.) Prachi Bhargava",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 1,
      "2021": 0,
      "2022": 2,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 4
  },
  {
    "id": 43,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Prof. (Dr.) Rajiv Dutta",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 1,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 44,
    "departmentCode": "IBST",
    "departmentName": "Institute of Biosciences and Technology",
    "instituteSlug": "institute-of-biosciences-and-technology",
    "supervisor": "Prof. (Dr.) Tabish Qidwai",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 2,
      "2025": 0,
      "2026": 3
    },
    "grandTotal": 6
  },
  {
    "id": 45,
    "departmentCode": "IER",
    "departmentName": "Institute of Education and Research",
    "instituteSlug": "institute-of-education-and-research",
    "supervisor": "Prof. (Dr.) Ritu Chandra",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 1,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 2
  },
  {
    "id": 46,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Prof. (Dr.) Akankssha Nigam",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 3,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 3
  },
  {
    "id": 47,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Amit Sinha",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 48,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Anushree Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 1,
      "2019": 1,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 2,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 4
  },
  {
    "id": 49,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Asha Srivastava",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 50,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Jyoti Dewan",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 2,
      "2022": 1,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 3
  },
  {
    "id": 51,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Prof. (Dr.) Madhu Dixit",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 1,
      "2022": 3,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 5
  },
  {
    "id": 52,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Nancy Gupta",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 2,
      "2024": 0,
      "2025": 2,
      "2026": 0
    },
    "grandTotal": 4
  },
  {
    "id": 53,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Pradeep Kumar Asthana",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 1,
      "2021": 1,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 54,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Raj Laxmi Srivastava",
    "yearly": {
      "2016": 0,
      "2017": 1,
      "2018": 1,
      "2019": 0,
      "2020": 3,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 6
  },
  {
    "id": 55,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Rinki Verma",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 2,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 56,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Ruchi Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 4,
      "2021": 2,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 6
  },
  {
    "id": 57,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Dr. Veena Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 2,
      "2022": 0,
      "2023": 1,
      "2024": 1,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 5
  },
  {
    "id": 58,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Prof. (Dr.) Ajay Prakash",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 1,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 59,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Prof. (Dr.) Alka Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 1,
      "2020": 3,
      "2021": 0,
      "2022": 2,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 7
  },
  {
    "id": 60,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Prof. (Dr.) Manoj Kumar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 2,
      "2022": 1,
      "2023": 1,
      "2024": 1,
      "2025": 1,
      "2026": 1
    },
    "grandTotal": 7
  },
  {
    "id": 61,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Prof. (Dr.) Nidhi Shukla",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 3,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 4
  },
  {
    "id": 62,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Prof. Praveen Srivastava",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 63,
    "departmentCode": "IMCE",
    "departmentName": "Institute of Management, Commerce & Economics",
    "instituteSlug": "institute-of-management-commerce-and-economics",
    "supervisor": "Prof.(Dr.) A. K. Singh",
    "yearly": {
      "2016": 1,
      "2017": 0,
      "2018": 0,
      "2019": 1,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 3
  },
  {
    "id": 64,
    "departmentCode": "IOP",
    "departmentName": "Institute of Pharmacy / Pharmaceutical Sciences",
    "instituteSlug": "institute-of-pharmacy",
    "supervisor": "Prof. (Dr.) Manju Pandey",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 5
    },
    "grandTotal": 5
  },
  {
    "id": 65,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Dr. Devendra Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 1,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 66,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Dr. Mahendra Kumar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 2,
      "2025": 2,
      "2026": 1
    },
    "grandTotal": 5
  },
  {
    "id": 67,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Dr. P.C. Mishra",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 1,
      "2020": 0,
      "2021": 0,
      "2022": 1,
      "2023": 1,
      "2024": 2,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 6
  },
  {
    "id": 68,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Dr. Prashant Kumar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 1,
      "2025": 2,
      "2026": 1
    },
    "grandTotal": 4
  },
  {
    "id": 69,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Dr. Shashank Shekhar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 70,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Dr. Sudhir Kumar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 1,
      "2019": 0,
      "2020": 2,
      "2021": 0,
      "2022": 3,
      "2023": 5,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 11
  },
  {
    "id": 71,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Dr. Sushil Kumar Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 1,
      "2022": 1,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 72,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Dr. Upendra Nath Tiwari",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 3,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 3
  },
  {
    "id": 73,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Prof. (Dr.) Aryendu Dwivedi",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 74,
    "departmentCode": "Law",
    "departmentName": "Institute of Legal Studies / Law",
    "instituteSlug": "institute-of-legal-studies",
    "supervisor": "Prof. (Dr.) Rohit P. Shabran",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 3,
      "2025": 4,
      "2026": 1
    },
    "grandTotal": 9
  },
  {
    "id": 75,
    "departmentCode": "ME",
    "departmentName": "Mechanical Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Prof. (Dr.) G. N. Tiwari",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 76,
    "departmentCode": "ME",
    "departmentName": "Mechanical Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Prof. (Dr.) Niraj Gupta",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 77,
    "departmentCode": "ME",
    "departmentName": "Mechanical Engineering",
    "instituteSlug": "institute-of-technology",
    "supervisor": "Prof. (Dr.) Rajesh Kumar Porwal",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 1,
      "2026": 1
    },
    "grandTotal": 3
  },
  {
    "id": 78,
    "departmentCode": "Math",
    "departmentName": "Mathematics & Statistical Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Akhilesh Kumar Mishra",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 79,
    "departmentCode": "Math",
    "departmentName": "Mathematics & Statistical Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Dilip Kumar Jaiswal",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 1,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 80,
    "departmentCode": "Math",
    "departmentName": "Mathematics & Statistical Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Rajnesh Kumar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 1,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 81,
    "departmentCode": "Math",
    "departmentName": "Mathematics & Statistical Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Prof. (Dr.) Kulbhushan Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 1,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 82,
    "departmentCode": "Math",
    "departmentName": "Mathematics & Statistical Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Prof. (Dr.) Prachi Bhargava",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 1,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 83,
    "departmentCode": "Math",
    "departmentName": "Mathematics & Statistical Sciences",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Prof. (Dr.) Virendra Nath Pathak",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 1,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 84,
    "departmentCode": "Media",
    "departmentName": "Institute of Media Studies / Journalism",
    "instituteSlug": "institute-of-media-studies",
    "supervisor": "Dr. Mili Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 2,
      "2025": 1,
      "2026": 1
    },
    "grandTotal": 4
  },
  {
    "id": 85,
    "departmentCode": "Media",
    "departmentName": "Institute of Media Studies / Journalism",
    "instituteSlug": "institute-of-media-studies",
    "supervisor": "Dr. Pradeep Kumar",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 86,
    "departmentCode": "Media",
    "departmentName": "Institute of Media Studies / Journalism",
    "instituteSlug": "institute-of-media-studies",
    "supervisor": "Dr. Ritesh Chaudhary",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 1,
      "2020": 0,
      "2021": 1,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  },
  {
    "id": 87,
    "departmentCode": "Media",
    "departmentName": "Institute of Media Studies / Journalism",
    "instituteSlug": "institute-of-media-studies",
    "supervisor": "Prof.(Dr.) A. K. Singh",
    "yearly": {
      "2016": 0,
      "2017": 1,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 1
  },
  {
    "id": 88,
    "departmentCode": "PHY",
    "departmentName": "Physics (Physical Sciences)",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Dr. Ram Gopal Singh & Dr. Shikha Singh",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 0,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": 0,
      "2026": 1
    },
    "grandTotal": 1
  },
  {
    "id": 89,
    "departmentCode": "PHY",
    "departmentName": "Physics (Physical Sciences)",
    "instituteSlug": "institute-of-natural-sciences-and-humanities",
    "supervisor": "Prof.(Dr.) B.M. Dixit",
    "yearly": {
      "2016": 0,
      "2017": 0,
      "2018": 1,
      "2019": 0,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 1,
      "2024": 0,
      "2025": 0,
      "2026": 0
    },
    "grandTotal": 2
  }
];

export const PHD_AWARDED_META = {
  totalPhDs: 249,
  totalSupervisors: 89,
  totalDepartments: 15,
  yearRange: "2016 - 2026",
  sourceFile: "Departmentwise Supervisorwise and Yearwise PhD Awarded.xlsx"
};

export const getPhDAwardedByInstitute = (instituteSlug: string): PhDAwardedRecord[] => {
  if (!instituteSlug || instituteSlug === 'all') return PHD_AWARDED_DATA;
  return PHD_AWARDED_DATA.filter((r) => r.instituteSlug === instituteSlug);
};

export const getPhDAwardedByDeptCode = (deptCode: string): PhDAwardedRecord[] => {
  if (!deptCode || deptCode === 'ALL') return PHD_AWARDED_DATA;
  return PHD_AWARDED_DATA.filter((r) => r.departmentCode.toLowerCase() === deptCode.toLowerCase());
};
