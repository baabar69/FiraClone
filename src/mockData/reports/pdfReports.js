const pdfReportData = {
  "annual_report_2023.pdf": {
    title: "Annual Report 2023 - TechInnovate PLC",
    summary:
      "TechInnovate PLC showed strong performance in FY2023 with revenues of £457 million, up 23% year-on-year. The company expanded its product portfolio in AI solutions and cloud services, while maintaining healthy margins despite increased R&D investment. Market position strengthened across UK and European markets.",
    fileSize: "12.8 MB",
    pageCount: 124,
    publicationDate: "March 15, 2023",
    extractedMetrics: {
      financial: {
        revenue: {
          value: 457,
          unit: "£ million",
          growth: 23,
          source:
            "Page 45: 'Total revenue for FY2023 reached £457 million, representing 23% growth compared to £371 million in FY2022.'",
        },
        ebitda: {
          value: 97.2,
          unit: "£ million",
          growth: 18.5,
          source:
            "Page 48: 'EBITDA increased to £97.2 million (FY2022: £82.0 million), with margin at 21.3%.'",
        },
        netIncome: {
          value: 68.5,
          unit: "£ million",
          growth: 27.1,
          source:
            "Page 52: 'Net income of £68.5 million represents a 27.1% increase from the prior year (FY2022: £53.9 million).'",
        },
        operatingCashFlow: {
          value: 102.3,
          unit: "£ million",
          growth: 31.2,
          source:
            "Page 64: 'Operating cash flow strengthened to £102.3 million, up 31.2% from FY2022.'",
        },
        dividendPerShare: {
          value: 0.32,
          unit: "£",
          growth: 14.3,
          source:
            "Page 73: 'The Board proposes a final dividend of £0.32 per share, a 14.3% increase.'",
        },
      },
      operational: {
        activeCustomers: {
          value: 3240,
          unit: "companies",
          growth: 18.2,
          source:
            "Page 24: 'TechInnovate's solutions served 3,240 active enterprise customers at fiscal year-end, an increase of 18.2%.'",
        },
        employeeCount: {
          value: 1875,
          unit: "people",
          growth: 15.4,
          source:
            "Page 38: 'Our talent base expanded to 1,875 employees, with significant growth in R&D and customer success roles.'",
        },
        r_d_expenditure: {
          value: 78.5,
          unit: "£ million",
          growth: 32.1,
          source:
            "Page 42: 'R&D investment rose to £78.5 million or 17.2% of revenue, underscoring our commitment to innovation.'",
        },
        newProductReleases: {
          value: 8,
          unit: "major releases",
          growth: 33.3,
          source:
            "Page 22: 'Eight major product releases this year included significant enhancements to our AI platform and data analytics suite.'",
        },
      },
      marketPosition: {
        marketShare: {
          value: 23.5,
          unit: "%",
          growth: 2.8,
          source:
            "Page 31: 'UK market share increased to 23.5%, strengthening our leadership position in enterprise technology solutions.'",
        },
        competitiveRanking: {
          value: 2,
          unit: "industry ranking",
          growth: 0,
          source:
            "Page 33: 'TechInnovate maintained its position as the second-largest provider in the European market.'",
        },
        customerSatisfaction: {
          value: 87,
          unit: "NPS score",
          growth: 5,
          source:
            "Page 28: 'Net Promoter Score improved to 87, reflecting our focus on customer experience and service quality.'",
        },
      },
    },
    keyBusinessSegments: [
      {
        name: "Cloud Infrastructure Solutions",
        revenue: 183.2,
        growth: 28.4,
        profitMargin: 32.5,
        source:
          "Page 46: 'Cloud Infrastructure Solutions revenue grew 28.4% to £183.2 million with margins expanding to 32.5%.'",
      },
      {
        name: "Data & AI Services",
        revenue: 142.7,
        growth: 41.3,
        profitMargin: 38.2,
        source:
          "Page 47: 'Data & AI Services saw exceptional growth of 41.3%, generating £142.7 million with industry-leading 38.2% margins.'",
      },
      {
        name: "Enterprise Applications",
        revenue: 95.3,
        growth: 11.5,
        profitMargin: 26.8,
        source:
          "Page 47: 'Enterprise Applications contributed £95.3 million, growing 11.5% with stable 26.8% margins.'",
      },
      {
        name: "Consulting & Implementation",
        revenue: 35.8,
        growth: -2.6,
        profitMargin: 18.7,
        source:
          "Page 48: 'Consulting & Implementation revenue declined slightly to £35.8 million, with margins compressed to 18.7%.'",
      },
    ],
    riskFactors: [
      {
        category: "Technology",
        description:
          "Rapid evolution of AI technologies requires continuous innovation to maintain competitive edge",
        impact: "High",
        mitigation:
          "Increased R&D investment and strategic technology partnerships",
        source:
          "Page 85: 'The pace of AI innovation presents both opportunities and challenges to our product roadmap.'",
      },
      {
        category: "Market",
        description:
          "Growing competition from global technology firms entering the UK enterprise market",
        impact: "Medium",
        mitigation:
          "Focus on domain expertise and localized solutions for UK businesses",
        source:
          "Page 86: 'Market entry by global technology companies requires us to emphasize our UK-specific expertise.'",
      },
      {
        category: "Operational",
        description:
          "Talent acquisition and retention in competitive technology sector",
        impact: "High",
        mitigation:
          "Enhanced compensation packages and focus on company culture and development opportunities",
        source:
          "Page 87: 'The war for talent remains a significant operational challenge across all business units.'",
      },
      {
        category: "Financial",
        description:
          "Currency fluctuations affecting international expansion and European operations",
        impact: "Medium",
        mitigation: "Hedging strategies and increased local currency contracts",
        source:
          "Page 88: 'Post-Brexit currency volatility impacts our European operations and expansion plans.'",
      },
      {
        category: "Regulatory",
        description:
          "Evolving data protection and AI governance regulations across markets",
        impact: "High",
        mitigation:
          "Proactive compliance programs and participation in industry standards development",
        source:
          "Page 89: 'The regulatory landscape for AI and data usage continues to evolve rapidly across our markets.'",
      },
    ],
    keyExecutives: [
      {
        name: "Dr. Sarah Mitchell",
        position: "Chief Executive Officer",
        background:
          "20+ years in technology leadership, former CTO at Global Systems Inc.",
        quote:
          "Our strong performance reflects both market demand and our strategic focus on innovation-led growth.",
        source: "Page 8: CEO Statement",
      },
      {
        name: "Robert Harrington",
        position: "Chief Financial Officer",
        background:
          "Previously Finance Director at TechGlobal, 15 years in technology finance",
        quote:
          "We've balanced growth investments with prudent financial management to deliver strong returns.",
        source: "Page 12: CFO Review",
      },
      {
        name: "Dr. James Wong",
        position: "Chief Technology Officer",
        background:
          "PhD in Computer Science, led R&D at AI Innovations Ltd before joining",
        quote:
          "Our AI capabilities now represent the core differentiator across our entire solution portfolio.",
        source: "Page 16: Technology Review",
      },
    ],
  },
  "quarterly_report_q2_2023.pdf": {
    title: "Quarterly Report Q2 2023 - FinanceCore Ltd",
    summary:
      "FinanceCore Ltd reported solid Q2 2023 results with revenues of £84.6 million, up 15.3% year-on-year. The fintech solutions provider saw strong growth in its payment processing and digital banking segments, while making strategic investments in blockchain and AI capabilities.",
    fileSize: "8.2 MB",
    pageCount: 78,
    publicationDate: "July 28, 2023",
    extractedMetrics: {
      financial: {
        revenue: {
          value: 84.6,
          unit: "£ million",
          growth: 15.3,
          source:
            "Page 12: 'Q2 revenue reached £84.6 million, representing 15.3% year-on-year growth from £73.4 million in Q2 2022.'",
        },
        ebitda: {
          value: 21.2,
          unit: "£ million",
          growth: 12.8,
          source:
            "Page 14: 'EBITDA for the quarter was £21.2 million (Q2 2022: £18.8 million) with margins at 25.1%.'",
        },
        netIncome: {
          value: 14.8,
          unit: "£ million",
          growth: 10.4,
          source:
            "Page 16: 'Net income increased to £14.8 million, up 10.4% compared to the same period last year.'",
        },
        transactionVolume: {
          value: 12.3,
          unit: "£ billion",
          growth: 28.1,
          source:
            "Page 8: 'Transaction volume processed through our platforms reached £12.3 billion, a 28.1% increase year-on-year.'",
        },
      },
      operational: {
        activeUsers: {
          value: 1.8,
          unit: "million",
          growth: 22.5,
          source:
            "Page 10: 'Active users across all platforms grew to 1.8 million, up 22.5% from the previous year.'",
        },
        transactionCount: {
          value: 142.6,
          unit: "million",
          growth: 31.2,
          source:
            "Page 10: 'Quarterly transaction count reached 142.6 million, representing 31.2% year-on-year growth.'",
        },
        newClientAcquisition: {
          value: 87,
          unit: "enterprise clients",
          growth: 16.0,
          source:
            "Page 22: 'Added 87 new enterprise clients in Q2, primarily in the financial services and retail sectors.'",
        },
      },
      marketPosition: {
        marketShare: {
          value: 18.7,
          unit: "%",
          growth: 1.2,
          source:
            "Page 32: 'UK fintech solutions market share increased to 18.7%, up from 17.5% in the previous quarter.'",
        },
        partnerEcosystem: {
          value: 230,
          unit: "integration partners",
          growth: 15.0,
          source:
            "Page 34: 'Partner ecosystem expanded to 230 integration partners, enhancing platform value proposition.'",
        },
      },
    },
    keyBusinessSegments: [
      {
        name: "Payment Processing Solutions",
        revenue: 38.1,
        growth: 18.2,
        profitMargin: 31.5,
        source:
          "Page 18: 'Payment Processing Solutions revenue grew to £38.1 million, up 18.2% year-on-year.'",
      },
      {
        name: "Digital Banking Infrastructure",
        revenue: 22.4,
        growth: 25.1,
        profitMargin: 28.3,
        source:
          "Page 19: 'Digital Banking Infrastructure saw strong growth of 25.1%, contributing £22.4 million in revenue.'",
      },
      {
        name: "Financial Analytics & Risk",
        revenue: 15.2,
        growth: 8.6,
        profitMargin: 32.8,
        source:
          "Page 19: 'Financial Analytics & Risk revenue reached £15.2 million, an 8.6% increase from Q2 2022.'",
      },
      {
        name: "Regulatory & Compliance Tech",
        revenue: 8.9,
        growth: -2.2,
        profitMargin: 22.5,
        source:
          "Page 20: 'Regulatory & Compliance Tech revenue declined slightly to £8.9 million due to delayed regulatory mandates.'",
      },
    ],
  },
};

export const getReportData = (filename) => {
  return pdfReportData[filename] || null;
};

export default pdfReportData;
