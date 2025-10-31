import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DataDictionaryEntry {
  dataSubset: string;
  field: string;
  fieldDescription: string;
  dataType: string;
  example: string;
  source: string;
  sourceSystem: string;
  notes: string;
}

const sampleData: DataDictionaryEntry[] = [
  {
    dataSubset: "Customer Data",
    field: "customer_segment",
    fieldDescription: "Customer grouping from CDM-DIL with related subsidy and discount data.",
    dataType: "STRING(100)",
    example: "Enterprise",
    source: "Master-data configured",
    sourceSystem: "CDM-DIL",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "company_name",
    fieldDescription: "Legal name of the business.",
    dataType: "STRING(100)",
    example: "Acme Corporation",
    source: "Synthetic",
    sourceSystem: "CDM-DIL",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "first_name",
    fieldDescription: "Given name of the customer created in new customer process in OTR.",
    dataType: "STRING(100)",
    example: "John",
    source: "Synthetic",
    sourceSystem: "CDM-DIL",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "name",
    fieldDescription: "Family name of the customer created in new customer process in OTR.",
    dataType: "STRING(100)",
    example: "Doe",
    source: "Synthetic",
    sourceSystem: "CDM-DIL",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "address",
    fieldDescription: "Full postal address for billing, delivery including street, city, post code but no country.",
    dataType: "STRING(500)",
    example: "123 Main Street, New York, NY 10001",
    source: "Synthetic",
    sourceSystem: "CDM-DIL",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "email",
    fieldDescription: "Customer contact email used for invoicing, offer document among others. Real emails maintained for some test steps but usually created synthetically.",
    dataType: "STRING(255)",
    example: "john.doe@example.com",
    source: "Real / Synthetic",
    sourceSystem: "CDM-DIL",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "phone",
    fieldDescription: "Customer phone number with valid country code.",
    dataType: "STRING(50)",
    example: "+1-555-123-4567",
    source: "Synthetic",
    sourceSystem: "CDM-DIL",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "vat_id",
    fieldDescription: "Customer VAT number consisting of 11 digits depending on the country used for taxes on invoices and only applies to business customers.",
    dataType: "STRING(50)",
    example: "DE123456789",
    source: "Synthetic",
    sourceSystem: "CDM-DIL",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "ucid",
    fieldDescription: "Unique system-assigned ID for each customer that's used across CRM, fleet, order, and ERP platforms.",
    dataType: "STRING(50)",
    example: "UCID-987654321",
    source: "System-assigned",
    sourceSystem: "One ERP",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "debtor_account_number",
    fieldDescription: "OneERP customer identifier.",
    dataType: "STRING(50)",
    example: "DEB-12345",
    source: "ERP-assigned",
    sourceSystem: "One ERP",
    notes: "",
  },
  {
    dataSubset: "Customer Data",
    field: "payment_term",
    fieldDescription: "The pre-defined window in which the payment is expected. NB45 is equivalent to 45 days.",
    dataType: "STRING(50)",
    example: "FB45",
    source: "Master-data configured",
    sourceSystem: "One ERP",
    notes: "",
  },
];

type SortField = keyof DataDictionaryEntry | null;
type SortDirection = "asc" | "desc";

export function DataDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubset, setSelectedSubset] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Get unique data subsets
  const uniqueSubsets = useMemo(() => {
    const subsets = Array.from(new Set(sampleData.map((entry) => entry.dataSubset)));
    return subsets.sort();
  }, []);

  const handleSort = (field: keyof DataDictionaryEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = sampleData.filter((entry) => {
      // Filter by data subset
      const subsetMatch =
        selectedSubset === "all" || entry.dataSubset === selectedSubset;
      
      // Filter by search term (searches only field column)
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        !searchTerm ||
        entry.field.toLowerCase().includes(searchLower);

      return subsetMatch && searchMatch;
    });

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const comparison = String(a[sortField]).localeCompare(String(b[sortField]));
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [searchTerm, selectedSubset, sortField, sortDirection]);

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold">Retail of the Future Test Data Dictionary</h1>
          <p className="text-muted-foreground">
            Field definitions, data types, examples, and lineage across all data subsets: Customers, Financing, Test Users & Agents, Customer Centers, Vehicles, Pricing, Subsidies.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: 29 Oct 2025
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm">Filter by Data Subset:</label>
            <Select value={selectedSubset} onValueChange={setSelectedSubset}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueSubsets.map((subset) => (
                  <SelectItem key={subset} value={subset}>
                    {subset}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontFamily: "Arial, sans-serif" }}>
              <thead style={{ backgroundColor: "#1e6b7a" }}>
                <tr>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "140px", minWidth: "140px" }}
                  >
                    Data Type
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "200px", minWidth: "200px" }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-white/10 text-white"
                      onClick={() => handleSort("field")}
                    >
                      Field
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "350px", minWidth: "350px" }}
                  >
                    Field Description
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "220px", minWidth: "220px" }}
                  >
                    Example
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "180px", minWidth: "180px" }}
                  >
                    Source
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "150px", minWidth: "150px" }}
                  >
                    Source System
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "200px", minWidth: "200px" }}
                  >
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((entry, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-3">{entry.dataType}</td>
                    <td className="p-3">{entry.field}</td>
                    <td className="p-3">{entry.fieldDescription}</td>
                    <td className="p-3 text-muted-foreground">
                      {entry.example}
                    </td>
                    <td className="p-3">{entry.source}</td>
                    <td className="p-3">{entry.sourceSystem}</td>
                    <td className="p-3 text-muted-foreground">
                      {entry.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedData.length} of {sampleData.length} entries
        </div>
      </div>
    </div>
  );
}
