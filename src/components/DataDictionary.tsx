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
  businessName: string;
  dataType: string;
  required: boolean;
  constraints: string[];
  relatedTo: string;
  example: string;
  notes: string;
}

const sampleData: DataDictionaryEntry[] = [
  {
    dataSubset: "Customer Data",
    field: "type",
    businessName: "Type",
    dataType: "STRING(50)",
    required: true,
    constraints: ["NOT NULL", "ENUM"],
    relatedTo: "",
    example: "Business",
    notes: "CUS-001",
  },
  {
    dataSubset: "Customer Data",
    field: "company_name",
    businessName: "Company Name",
    dataType: "STRING(255)",
    required: false,
    constraints: [],
    relatedTo: "",
    example: "Acme Corporation",
    notes: "CUS-002",
  },
  {
    dataSubset: "Customer Data",
    field: "first_name",
    businessName: "First Name",
    dataType: "STRING(100)",
    required: true,
    constraints: ["NOT NULL"],
    relatedTo: "",
    example: "John",
    notes: "CUS-003",
  },
  {
    dataSubset: "Customer Data",
    field: "last_name",
    businessName: "Last Name",
    dataType: "STRING(100)",
    required: true,
    constraints: ["NOT NULL"],
    relatedTo: "",
    example: "Doe",
    notes: "CUS-004",
  },
  {
    dataSubset: "Customer Data",
    field: "address",
    businessName: "Address",
    dataType: "STRING(500)",
    required: false,
    constraints: [],
    relatedTo: "",
    example: "123 Main Street, New York, NY 10001",
    notes: "CUS-005",
  },
  {
    dataSubset: "Customer Data",
    field: "email_id",
    businessName: "E-Mail ID",
    dataType: "STRING(255)",
    required: true,
    constraints: ["UNIQUE", "EMAIL_FORMAT"],
    relatedTo: "",
    example: "john.doe@example.com",
    notes: "CUS-006, VAL-001",
  },
  {
    dataSubset: "Customer Data",
    field: "phone",
    businessName: "Phone",
    dataType: "STRING(20)",
    required: false,
    constraints: ["PHONE_FORMAT"],
    relatedTo: "",
    example: "+1-555-123-4567",
    notes: "CUS-007",
  },
  {
    dataSubset: "Customer Data",
    field: "vat_id",
    businessName: "Vat ID",
    dataType: "STRING(50)",
    required: false,
    constraints: ["UNIQUE"],
    relatedTo: "",
    example: "DE123456789",
    notes: "CUS-008, TAX-001",
  },
  {
    dataSubset: "Customer Data",
    field: "ucid",
    businessName: "UCID",
    dataType: "STRING(50)",
    required: false,
    constraints: ["UNIQUE"],
    relatedTo: "",
    example: "UCID-987654321",
    notes: "CUS-009",
  },
  {
    dataSubset: "Customer Data",
    field: "debtor_account",
    businessName: "Debtor Account",
    dataType: "STRING(50)",
    required: false,
    constraints: [],
    relatedTo: "",
    example: "DEB-12345",
    notes: "CUS-010, FIN-001",
  },
  {
    dataSubset: "Customer Data",
    field: "payment_term",
    businessName: "Payment Term",
    dataType: "STRING(50)",
    required: false,
    constraints: ["ENUM"],
    relatedTo: "",
    example: "Net 30",
    notes: "CUS-011, PAY-001",
  },
  {
    dataSubset: "Customer Data",
    field: "customer_segment",
    businessName: "Customer Segment",
    dataType: "STRING(100)",
    required: false,
    constraints: ["ENUM"],
    relatedTo: "",
    example: "Enterprise",
    notes: "CUS-012, SEG-001",
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
          <h1>Data Dictionary</h1>
          <p className="text-muted-foreground">
            Database schema reference with field definitions, types, and
            constraints
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
                    style={{ width: "150px", minWidth: "150px" }}
                  >
                    Data Subset
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "320px", minWidth: "320px" }}
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
                    style={{ width: "140px", minWidth: "140px" }}
                  >
                    Data Type
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "80px", minWidth: "80px" }}
                  >
                    Required
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "220px", minWidth: "220px" }}
                  >
                    Constraints
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "180px", minWidth: "180px" }}
                  >
                    Related To
                  </th>
                  <th
                    className="text-left p-3 border-b border-[#1e6b7a] text-white font-medium"
                    style={{ width: "220px", minWidth: "220px" }}
                  >
                    Example
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
                    <td className="p-3">{entry.dataSubset}</td>
                    <td className="p-3">{entry.field}</td>
                    <td className="p-3">{entry.dataType}</td>
                    <td className="p-3 text-center">
                      {entry.required ? "✓" : "−"}
                    </td>
                    <td className="p-3">
                      {entry.constraints.join(", ")}
                    </td>
                    <td className="p-3">
                      {entry.relatedTo}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {entry.example}
                    </td>
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
