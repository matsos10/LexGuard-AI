import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { ComplianceAudit, ComplianceAuditStatus } from '@shared/types';
import { cn } from '@/lib/utils';
import { Toaster, toast } from '@/components/ui/sonner';
import { PlusCircle } from 'lucide-react';
const statusStyles: Record<ComplianceAuditStatus, string> = {
  Passed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
  Failed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-700',
};
const frameworkStyles: Record<ComplianceAudit['framework'], string> = {
  GDPR: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  'SOC 2': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-700',
  'ISO 27001': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700',
};
const AuditCard = ({ audit }: { audit: ComplianceAudit }) => (
  <Card className="hover:shadow-md transition-shadow duration-200">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <Badge variant="outline" className={cn('font-semibold mb-2', frameworkStyles[audit.framework])}>
            {audit.framework}
          </Badge>
          <CardTitle>{audit.title}</CardTitle>
        </div>
        <Badge variant="outline" className={cn('font-semibold', statusStyles[audit.status])}>
          {audit.status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{audit.progress}%</span>
        </div>
        <Progress value={audit.progress} />
        <p className="text-sm text-muted-foreground">
          {audit.status === 'In Progress' ? 'Due by' : 'Completed on'} {new Date(audit.completionDate).toLocaleDateString()}
        </p>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">View Details</Button>
    </CardFooter>
  </Card>
);
const SkeletonCard = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-7 w-48" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
      </div>
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-4 w-32" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);
export function CompliancePage() {
  const [audits, setAudits] = useState<ComplianceAudit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAudits = async () => {
      setIsLoading(true);
      try {
        const data = await api<ComplianceAudit[]>('/api/compliance/audits');
        setAudits(data);
      } catch (error) {
        toast.error('Failed to fetch compliance audits.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAudits();
  }, []);
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance Audits</h1>
          <p className="text-muted-foreground">Monitor and manage your compliance status.</p>
        </div>
        <Button onClick={() => toast.info('Creating a new audit is not yet implemented.')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Audit
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : audits.length > 0 ? (
          audits.map((audit) => <AuditCard key={audit.id} audit={audit} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No audits found.</p>
          </div>
        )}
      </div>
      <Toaster richColors />
    </div>
  );
}