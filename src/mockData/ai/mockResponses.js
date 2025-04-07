const mockAIResponses = {
  "Show revenue trends for Rolls-Royce Holdings PLC over the last 5 years": {
    response:
      "Rolls-Royce Holdings PLC has experienced significant volatility in revenue over the past 5 years. After a strong performance in 2019 with £15.45 billion in revenue, the company saw a sharp decline to £11.76 billion in 2020 due to the COVID-19 pandemic's severe impact on the aviation industry. Revenue further decreased slightly to £11.22 billion in 2021 as travel restrictions continued. However, a recovery began in 2022 with revenue climbing to £12.69 billion, followed by a stronger rebound to £14.5 billion in 2023, nearly returning to pre-pandemic levels. This represents a 14.3% year-on-year growth from 2022 to 2023.",
    sourceCitations: [
      "Annual Report 2023, p.45: 'Group consolidated revenue increased to £14.5 billion, up 14.3% from prior year.'",
      "Annual Report 2022, p.38: 'Revenue improved to £12.69 billion as flight hours began recovery.'",
      "Annual Report 2021, p.42: 'Revenue declined to £11.22 billion due to continued impact of travel restrictions.'",
    ],
    chartData: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Revenue (£ million)",
          data: [15450, 11760, 11218, 12691, 14500],
          borderColor: "#3366cc",
          backgroundColor: "rgba(51, 102, 204, 0.2)",
          fill: true,
        },
      ],
    },
  },
  "Compare EBITDA margins of FTSE 100 retail companies": {
    response:
      "Among FTSE 100 retail companies, Tesco PLC has maintained relatively stable EBITDA margins over the past 5 years, ranging between 6.3% and 6.8%. In 2023, Tesco achieved an EBITDA margin of 6.5%, slightly above the sector average of 6.2%. By comparison, Sainsbury's posted a margin of 5.9%, while Ocado showed more volatility with margins between 3.5% and 7.2% over the period, ending 2023 at 4.8%. Marks & Spencer has shown the most improvement, increasing margins from a 5-year low of 4.7% to reach 6.3% in 2023, reflecting successful restructuring efforts.",
    sourceCitations: [
      "Tesco Annual Report 2023, p.58: 'EBITDA margin remained steady at 6.5%, reflecting operational efficiency improvements.'",
      "Retail Sector Financial Analysis Q4 2023, p.17: 'Average EBITDA margins for FTSE 100 retailers settled at 6.2% for fiscal year.'",
      "M&S Investor Presentation, March 2023, Slide 12: 'Operational restructuring delivered 160 basis point improvement in EBITDA margin.'",
    ],
    chartData: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Tesco",
          data: [6.5, 6.8, 6.3, 6.4, 6.5],
          borderColor: "#3366cc",
          backgroundColor: "transparent",
        },
        {
          label: "Sainsbury's",
          data: [5.8, 5.5, 5.3, 5.7, 5.9],
          borderColor: "#dc3912",
          backgroundColor: "transparent",
        },
        {
          label: "M&S",
          data: [5.2, 4.7, 5.0, 5.8, 6.3],
          borderColor: "#ff9900",
          backgroundColor: "transparent",
        },
        {
          label: "Ocado",
          data: [5.5, 3.5, 7.2, 5.3, 4.8],
          borderColor: "#109618",
          backgroundColor: "transparent",
        },
      ],
    },
  },
  "Analyze the impact of rising interest rates on HSBC Holdings PLC": {
    response:
      "HSBC Holdings PLC has benefited significantly from the rising interest rate environment, with net interest income increasing 19.5% year-on-year in 2023. The bank's net interest margin expanded from 1.48% in 2022 to 1.66% in 2023, driving profitability improvements across its global operations. In particular, HSBC's UK banking division saw a 33% increase in profit before tax, largely attributed to widening interest margins. However, the bank also noted potential medium-term risks, including pressure on mortgage volumes due to higher rates, and an expected increase in loan impairments as businesses and consumers adjust to higher borrowing costs. HSBC's management anticipates that the positive impact of higher rates may moderate in 2024 as competition for deposits intensifies, potentially compressing margins from their current peaks.",
    sourceCitations: [
      "HSBC Annual Report 2023, p.72: 'Net interest margin expanded to 1.66%, driving a 19.5% increase in net interest income.'",
      "HSBC Q4 2023 Earnings Call Transcript: 'UK banking profit before tax rose 33%, primarily due to interest rate benefits.'",
      "HSBC Risk Assessment 2023, p.45: 'Expected credit losses increased moderately as higher interest rates begin to impact certain customer segments.'",
    ],
    chartData: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Net Interest Margin (%)",
          data: [1.58, 1.35, 1.2, 1.48, 1.66],
          borderColor: "#3366cc",
          backgroundColor: "rgba(51, 102, 204, 0.2)",
          yAxisID: "y",
          fill: true,
        },
        {
          label: "Net Interest Income ($ billion)",
          data: [30.5, 27.6, 26.5, 32.6, 39.0],
          borderColor: "#dc3912",
          backgroundColor: "transparent",
          yAxisID: "y1",
          type: "bar",
        },
      ],
    },
  },
  "What are the key risks facing BP PLC in transitioning to renewable energy?":
    {
      response:
        "BP PLC faces several significant risks in its transition to renewable energy. The most pressing challenge is the substantial capital expenditure required to build renewable capacity, which reached £5.8 billion in 2023, impacting short-term returns and potentially straining the balance sheet. There's also considerable technological risk, as BP invests in early-stage technologies like hydrogen and carbon capture that may not deliver expected returns. Market risks include volatile pricing in renewable markets, with power price fluctuations affecting project economics. Additionally, BP faces execution risk in rapidly scaling new business models outside its traditional expertise. Regulatory and policy uncertainty across different jurisdictions could impact the economics of renewable investments, while stakeholder risk manifests in balancing fossil fuel shareholder expectations for dividends against the need for renewable investments with longer payback periods.",
      sourceCitations: [
        "BP Strategic Report 2023, p.34: 'Renewable investments reached £5.8 billion, representing 35% of total capital expenditure.'",
        "BP Risk Factors, Annual Report 2023, p.76: 'Returns from renewable investments are subject to technological maturity challenges and market price volatility.'",
        "BP Investor Day Presentation, March 2023, Slide 28: 'Policy frameworks across key markets remain in flux, presenting both opportunities and risks to green energy transition.'",
      ],
      chartData: {
        labels: [
          "Capital Requirements",
          "Technology Risk",
          "Market Volatility",
          "Execution Capability",
          "Regulatory Uncertainty",
          "Stakeholder Expectations",
        ],
        datasets: [
          {
            label: "Risk Severity (1-10 scale)",
            data: [8, 7, 6, 8, 7, 6],
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    },
  "Evaluate AstraZeneca's pipeline and growth prospects": {
    response:
      "AstraZeneca's pipeline is one of the strongest in the pharmaceutical industry, with 189 projects in clinical development as of 2023, up from 183 in 2022. Oncology remains the company's primary focus, comprising approximately 38% of the pipeline, followed by rare diseases (22%) and immunology (17%). AstraZeneca has 43 late-stage programs (Phase III or registration), suggesting strong near-term revenue potential. The company's R&D expenditure has grown consistently, reaching £9.91 billion in 2023, representing 21.6% of revenue. Key growth drivers include Oncology drugs Tagrisso, Imfinzi, and Lynparza, which together generated £7.8 billion in 2023 revenue. The recent acquisitions in rare diseases (including Alexion) and cell therapies have diversified growth prospects. Analysts project a 5-year revenue CAGR of 8-10% through 2028, outpacing industry averages. However, patent expirations for key drugs like Tagrisso (2032 in the US, 2033 in EU) will present challenges, making pipeline success critical for sustaining growth.",
    sourceCitations: [
      "AstraZeneca Annual Report 2023, p.28: 'Pipeline expanded to 189 projects, with 43 assets in late-stage development.'",
      "AstraZeneca R&D Day Presentation, November 2023, Slide 15: 'Oncology pipeline increased to 72 projects, with 19 late-stage assets.'",
      "Analyst Consensus Report, February 2024, p.8: 'Projected 5-year CAGR of 8-10% exceeds industry average of 5.7%.'",
    ],
    chartData: {
      labels: [
        "Oncology",
        "Rare Diseases",
        "Immunology",
        "Cardiovascular",
        "Respiratory",
        "Other",
      ],
      datasets: [
        {
          label: "Pipeline Distribution (%)",
          data: [38, 22, 17, 12, 8, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  // Generic fallback response
  default: {
    response:
      "I'm analyzing UK company financial data and can help with questions about revenue trends, profitability metrics, competitive positioning, and risk factors for major UK public companies. You can ask specific questions about FTSE 100 companies or inquire about sector-wide trends. For example, try asking about revenue trends, EBITDA margins, or strategic developments for companies like Rolls-Royce, Tesco, AstraZeneca, HSBC, or BP.",
    sourceCitations: [],
    chartData: null,
  },
};

// Helper function to get a response
export const getAIResponse = (query) => {
  // Check for exact match
  if (mockAIResponses[query]) {
    return mockAIResponses[query];
  }

  // Check for partial matches
  const keys = Object.keys(mockAIResponses);
  for (const key of keys) {
    if (key !== "default" && query.toLowerCase().includes(key.toLowerCase())) {
      return mockAIResponses[key];
    }
  }

  // Return default response
  return mockAIResponses["default"];
};

export default mockAIResponses;
