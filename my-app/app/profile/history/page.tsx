"use client"

import { useEffect, useState } from "react"
import { BadgeCheck, Calendar, Download, Filter, Gift, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPointHistory } from "@/lib/api"

interface PointTransaction {
  id: string
  date: string
  description: string
  points: number
  type: "earn" | "redeem"
}

export default function PointHistoryPage(): JSX.Element {
  const [pointHistory, setPointHistory] = useState<PointTransaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filterType, setFilterType] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("all-time")

  useEffect(() => {
    async function loadData() {
      try {
        // In a real app, we would get the userId from authentication
        const userId = "user123"
        const pointHistoryData = await getPointHistory(userId)

        // Add more mock data for demonstration
        const mockData: PointTransaction[] = [
          ...pointHistoryData,
          {
            id: "tx-4",
            date: "2023-07-10",
            description: "Dining at Kuriftu Restaurant",
            points: 750,
            type: "earn",
          },
          {
            id: "tx-5",
            date: "2023-06-05",
            description: "Spa Treatment Redemption",
            points: -8000,
            type: "redeem",
          },
          {
            id: "tx-6",
            date: "2023-05-22",
            description: "Stay at Kuriftu Resort Lake Tana",
            points: 4200,
            type: "earn",
          },
          {
            id: "tx-7",
            date: "2023-04-15",
            description: "Welcome Bonus",
            points: 1000,
            type: "earn",
          },
          {
            id: "tx-8",
            date: "2023-03-30",
            description: "Airport Transfer Redemption",
            points: -2500,
            type: "redeem",
          },
        ]

        setPointHistory(mockData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter transactions based on search, type, and date range
  const filteredTransactions = pointHistory.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType

    // Date filtering logic would go here in a real app
    // For now, we'll just return true for all date ranges
    const matchesDate = true

    return matchesSearch && matchesType && matchesDate
  })

  // Calculate totals
  const totalEarned = filteredTransactions.filter((t) => t.type === "earn").reduce((sum, t) => sum + t.points, 0)

  const totalRedeemed = filteredTransactions
    .filter((t) => t.type === "redeem")
    .reduce((sum, t) => sum + Math.abs(t.points), 0)

  const currentBalance = totalEarned - totalRedeemed

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Point History</h1>
          <p className="text-muted-foreground">Track your points earnings and redemptions</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export History
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Earned</div>
                <div className="text-3xl font-bold text-green-600">+{totalEarned.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Redeemed</div>
                <div className="text-3xl font-bold text-amber-600">-{totalRedeemed.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Gift className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Current Balance</div>
                <div className="text-3xl font-bold text-primary">{currentBalance.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="earned">Points Earned</TabsTrigger>
          <TabsTrigger value="redeemed">Points Redeemed</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="earn">Earned Points</SelectItem>
                <SelectItem value="redeem">Redeemed Points</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <SelectValue placeholder="Date range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Showing {filteredTransactions.length} transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="py-4 flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "earn" ? "bg-green-100" : "bg-amber-100"
                          }`}
                        >
                          {transaction.type === "earn" ? (
                            <BadgeCheck className="h-5 w-5 text-green-600" />
                          ) : (
                            <Gift className="h-5 w-5 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold ${transaction.type === "earn" ? "text-green-600" : "text-amber-600"}`}>
                        {transaction.type === "earn" ? "+" : "-"}
                        {Math.abs(transaction.points).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No transactions found matching your filters.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earned">
          <Card>
            <CardHeader>
              <CardTitle>Points Earned</CardTitle>
              <CardDescription>
                Showing {filteredTransactions.filter((t) => t.type === "earn").length} earning transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {filteredTransactions.filter((t) => t.type === "earn").length > 0 ? (
                  filteredTransactions
                    .filter((t) => t.type === "earn")
                    .map((transaction) => (
                      <div key={transaction.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-green-100">
                            <BadgeCheck className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-green-600">+{transaction.points.toLocaleString()}</div>
                      </div>
                    ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No earning transactions found matching your filters.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redeemed">
          <Card>
            <CardHeader>
              <CardTitle>Points Redeemed</CardTitle>
              <CardDescription>
                Showing {filteredTransactions.filter((t) => t.type === "redeem").length} redemption transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {filteredTransactions.filter((t) => t.type === "redeem").length > 0 ? (
                  filteredTransactions
                    .filter((t) => t.type === "redeem")
                    .map((transaction) => (
                      <div key={transaction.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-amber-100">
                            <Gift className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-amber-600">-{Math.abs(transaction.points).toLocaleString()}</div>
                      </div>
                    ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No redemption transactions found matching your filters.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
