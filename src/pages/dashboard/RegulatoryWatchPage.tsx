import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { RegulatoryAlert, RegulatoryAlertStatus } from '@shared/types';
import { cn } from '@/lib/utils';
import { ListFilter, Search } from 'lucide-react';
import { Toaster, toast } from '@/components/ui/sonner';
const statusStyles: Record<RegulatoryAlertStatus, string> = {
  Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
  Archived: 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400 border-gray-200 dark:border-gray-600',
};
export function RegulatoryWatchPage() {
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Set<RegulatoryAlertStatus>>(new Set());
  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      try {
        const data = await api<RegulatoryAlert[]>('/api/regulatory-watch');
        setAlerts(data);
      } catch (error) {
        toast.error('Failed to fetch regulatory alerts.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlerts();
  }, []);
  const filteredAlerts = useMemo(() => {
    return alerts
      .filter((alert) => {
        if (statusFilter.size > 0 && !statusFilter.has(alert.status)) {
          return false;
        }
        if (searchTerm) {
          const lowercasedTerm = searchTerm.toLowerCase();
          return (
            alert.title.toLowerCase().includes(lowercasedTerm) ||
            alert.jurisdiction.toLowerCase().includes(lowercasedTerm) ||
            alert.source.toLowerCase().includes(lowercasedTerm)
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
  }, [alerts, searchTerm, statusFilter]);
  const toggleStatusFilter = (status: RegulatoryAlertStatus) => {
    setStatusFilter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(status)) {
        newSet.delete(status);
      } else {
        newSet.add(status);
      }
      return newSet;
    });
  };
  const SkeletonLoader = () => (
    Array.from({ length: 10 }).map((_, i) => (
      <TableRow key={`skeleton-${i}`}>
        <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
        <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
        <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
      </TableRow>
    ))
  );
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Regulatory Watch</h1>
        <p className="text-muted-foreground">Stay updated with the latest regulatory changes.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Filter by Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(['Active', 'Pending', 'Archived'] as RegulatoryAlertStatus[]).map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.has(status)}
                    onCheckedChange={() => toggleStatusFilter(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Publication Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <SkeletonLoader />
                ) : filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <TableRow key={alert.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{alert.title}</TableCell>
                      <TableCell>{alert.jurisdiction}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('font-semibold', statusStyles[alert.status])}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>{new Date(alert.publicationDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No alerts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Toaster richColors />
    </div>
  );
}