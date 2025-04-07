const reportTemplates = {
  standardFinancialAnalysis: {
    id: "std-fin-analysis",
    name: "Standard Financial Analysis",
    description:
      "Comprehensive financial analysis with business model overview, revenue breakdown, and market positioning.",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        required: true,
        defaultContent:
          "This report provides a financial analysis of [Company Name] based on available public information and financial statements.",
        aiPrompt:
          "Write a brief introduction about the company analyzed in this report, mentioning its sector and main business activities.",
      },
      {
        id: "businessModel",
        title: "Business Model",
        required: true,
        subsections: [
          {
            id: "keyPartnerships",
            title: "Key Partnerships",
            required: false,
            aiPrompt:
              "Describe the key partnerships and strategic alliances of the company.",
          },
          {
            id: "strategicDifferentiation",
            title: "Strategic Differentiation",
            required: true,
            aiPrompt:
              "Explain what makes this company different from its competitors and its unique value proposition.",
          },
          {
            id: "recentDevelopments",
            title: "Recent Developments",
            required: true,
            aiPrompt:
              "List and explain recent significant developments such as acquisitions, major product launches, or strategic shifts.",
          },
        ],
      },
      {
        id: "revenueBreakdown",
        title: "Revenue Breakdown",
        required: true,
        defaultContent:
          "This section analyzes the company's revenue streams and their performance over time.",
        aiPrompt:
          "Break down the company's revenue by business segments or geographical regions, including growth rates.",
      },
      {
        id: "financialAnalysis",
        title: "Financial Analysis & Income Statement",
        required: true,
        subsections: [
          {
            id: "profitabilityMetrics",
            title: "Profitability Metrics",
            required: true,
            aiPrompt:
              "Analyze key profitability metrics including gross margin, EBITDA margin, operating margin, and net margin.",
          },
          {
            id: "cashFlow",
            title: "Cash Flow Analysis",
            required: true,
            aiPrompt:
              "Analyze the company's cash flow, including operating cash flow, free cash flow, and cash conversion metrics.",
          },
          {
            id: "balanceSheet",
            title: "Balance Sheet Overview",
            required: false,
            aiPrompt:
              "Provide a high-level analysis of the company's balance sheet, including debt levels, liquidity, and asset quality.",
          },
        ],
      },
      {
        id: "operationalKPIs",
        title: "Operational KPIs",
        required: true,
        aiPrompt:
          "Identify and analyze key operational performance indicators specific to the company's industry.",
      },
      {
        id: "marketPosition",
        title: "Market Position",
        required: true,
        subsections: [
          {
            id: "overview",
            title: "Market Overview",
            required: true,
            aiPrompt:
              "Describe the overall market in which the company operates, including size, growth rate, and trends.",
          },
          {
            id: "competitiveLandscape",
            title: "Competitive Landscape",
            required: true,
            aiPrompt:
              "Analyze the company's position relative to competitors, including market share and competitive advantages/disadvantages.",
          },
          {
            id: "strategicPositioning",
            title: "Strategic Positioning",
            required: false,
            aiPrompt:
              "Explain the company's strategic positioning within its market and industry.",
          },
          {
            id: "macroeconomicConsiderations",
            title: "Macroeconomic Considerations",
            required: true,
            aiPrompt:
              "Discuss macroeconomic factors that could impact the company's performance in the near to medium term.",
          },
        ],
      },
      {
        id: "corporateGovernance",
        title: "Corporate Governance",
        required: false,
        aiPrompt:
          "Analyze the company's governance structure, board composition, and alignment with shareholder interests.",
      },
      {
        id: "keyCatalysts",
        title: "Key Catalysts",
        required: true,
        aiPrompt:
          "Identify and analyze potential future events or trends that could positively impact the company's performance.",
      },
      {
        id: "risksAndConcerns",
        title: "Risks & Concerns",
        required: true,
        aiPrompt:
          "Identify and analyze key risks facing the company, including operational, financial, regulatory, and market risks.",
      },
      {
        id: "summary",
        title: "Summary",
        required: true,
        aiPrompt:
          "Provide a concise summary of the key findings and overall assessment of the company's financial health and prospects.",
      },
    ],
  },
  quickFinancialUpdate: {
    id: "quick-fin-update",
    name: "Quick Financial Update",
    description:
      "Focused financial update highlighting recent performance and notable changes.",
    sections: [
      {
        id: "executiveSummary",
        title: "Executive Summary",
        required: true,
        aiPrompt:
          "Provide a brief executive summary of the company's recent financial performance and strategic positioning.",
      },
      {
        id: "performanceHighlights",
        title: "Performance Highlights",
        required: true,
        aiPrompt:
          "Highlight key financial and operational metrics, particularly those showing significant changes.",
      },
      {
        id: "revenueAndProfitability",
        title: "Revenue & Profitability",
        required: true,
        aiPrompt:
          "Analyze recent revenue and profitability trends, including margins and growth rates.",
      },
      {
        id: "strategicInitiatives",
        title: "Strategic Initiatives Update",
        required: true,
        aiPrompt:
          "Provide updates on the company's key strategic initiatives and their progress.",
      },
      {
        id: "shortTermOutlook",
        title: "Short-term Outlook",
        required: true,
        aiPrompt:
          "Discuss the company's short-term outlook based on recent developments and market conditions.",
      },
    ],
  },
};

// Mock data for a pre-filled report based on the standard template
const mockPrefilledReport = {
  templateId: "std-fin-analysis",
  companyName: "TechInnovate PLC",
  lastUpdated: "2023-04-15T14:32:45Z",
  sections: {
    introduction: {
      content:
        "TechInnovate PLC is a UK-based technology company specializing in enterprise software solutions with a focus on AI and cloud services. The company has shown strong growth in recent years, expanding its market presence across Europe while maintaining healthy margins. This analysis examines TechInnovate's financial performance based on its FY2023 annual report and supplementary market research.",
      sources: ["Annual Report 2023", "Industry Analysis Q1 2023 - Gartner"],
    },
    businessModel: {
      keyPartnerships: {
        content:
          "TechInnovate maintains strategic partnerships with major cloud providers including AWS, Microsoft Azure, and Google Cloud, allowing it to offer integrated solutions across platforms. The company has also established technology alliances with leading AI research institutions, providing access to cutting-edge innovations. Recent partnership with UK financial institutions has expanded its fintech capabilities.",
        sources: [
          "Annual Report 2023, p.28",
          "Partnership Announcement, Jan 2023",
        ],
      },
      strategicDifferentiation: {
        content:
          "TechInnovate differentiates itself through its proprietary AI engine (TechInnovate AI Core) which underpins all its product offerings and enables rapid customization for specific industry verticals. The company's focus on UK-specific regulatory compliance provides an advantage in regulated industries such as financial services and healthcare. Additionally, its hybrid deployment model offers flexibility that many global competitors lack.",
        sources: [
          "CEO Interview, Tech Quarterly, March 2023",
          "Annual Report 2023, p.15",
        ],
      },
      recentDevelopments: {
        content:
          "In FY2023, TechInnovate completed the acquisition of DataSecure Ltd, a UK-based data security specialist, strengthening its compliance capabilities. The company launched its next-generation AI analytics platform in November 2022, which has seen rapid customer adoption. TechInnovate also established a new R&D center in Edinburgh focused on machine learning technologies, adding 120 specialized roles.",
        sources: [
          "Annual Report 2023, p.42",
          "Press Release, November 2022",
          "Annual Report 2023, p.38",
        ],
      },
    },
    revenueBreakdown: {
      content:
        "TechInnovate's revenue reached £457 million in FY2023, representing 23% year-on-year growth. The company's revenue is divided across four main business segments:\n\n- Cloud Infrastructure Solutions: £183.2 million (40% of total, 28.4% growth)\n- Data & AI Services: £142.7 million (31% of total, 41.3% growth)\n- Enterprise Applications: £95.3 million (21% of total, 11.5% growth)\n- Consulting & Implementation: £35.8 million (8% of total, -2.6% growth)\n\nGeographically, the UK remains TechInnovate's primary market, generating 68% of revenue, followed by Europe (23%) and other regions (9%).",
      sources: [
        "Annual Report 2023, p.46-48",
        "Investor Presentation, Q4 2023",
      ],
    },
    operationalKPIs: {
      content:
        "Key operational metrics for TechInnovate show positive momentum:\n\n- Active enterprise customers: 3,240 (18.2% increase)\n- Employee headcount: 1,875 (15.4% increase)\n- R&D expenditure: £78.5 million (17.2% of revenue, 32.1% increase)\n- Customer retention rate: 94.2% (improved from 92.7% in FY2022)\n- Average contract value: £141,000 (12.8% increase)\n- Net Promoter Score: 87 (up from 82 in FY2022)",
      sources: [
        "Annual Report 2023, p.24, 38, 42",
        "Customer Success Report, Q4 2023",
      ],
    },
    keyCatalysts: {
      content:
        "Several potential catalysts may drive TechInnovate's future growth:\n\n1. Growing demand for AI-driven enterprise solutions, with the UK market expected to expand at 25% CAGR through 2026\n2. Expansion into healthcare and financial services verticals, which have shown early success\n3. Potential geographic expansion into APAC markets, with initial partnerships already established\n4. Launch of SaaS-based SME offering in Q3 2023, opening a new market segment\n5. Increasing focus on recurring revenue streams, which now comprise 72% of total revenue",
      sources: [
        "Industry Forecast 2023-2026, IDC",
        "Annual Report 2023, p.62",
        "CEO Statement, Annual Report 2023, p.8",
      ],
    },
  },
};

export const getReportTemplate = (templateId) => {
  return reportTemplates[templateId] || null;
};

export const getMockPrefilledReport = () => {
  return mockPrefilledReport;
};

export default reportTemplates;
