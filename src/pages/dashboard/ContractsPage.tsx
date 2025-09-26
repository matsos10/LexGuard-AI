import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { Contract, ContractStatus, ContractAnalysis } from '@shared/types';
import { cn } from '@/lib/utils';
import { Toaster, toast } from '@/components/ui/sonner';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ContractAnalysisModal } from '@/components/ContractAnalysisModal';
const statusStyles: Record<ContractStatus, string> = {
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
  Failed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-700',
};
export function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const fetchContracts = async () => {
    setIsLoading(true);
    try {
      const data = await api<Contract[]>('/api/contracts');
      setContracts(data);
    } catch (error) {
      toast.error('Failed to fetch contracts.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchContracts();
  }, []);
  const handleUpload = async (file: File) => {
    try {
      const { contract } = await api<{ contract: Contract }>('/api/contracts/analyze', {
        method: 'POST',
      });
      toast.success(`"${file.name}" uploaded and analyzed successfully.`);
      setContracts(prev => [contract, ...prev]);
    } catch (error) {
      toast.error(`Failed to analyze "${file.name}".`);
      throw error;
    }
  };
  const handleViewAnalysis = async (contract: Contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
    setIsAnalysisLoading(true);
    try {
      const data = await api<ContractAnalysis>(`/api/contracts/${contract.id}/analysis`);
      setAnalysis(data);
    } catch (error) {
      toast.error('Failed to fetch contract analysis.');
      setAnalysis(null);
    } finally {
      setIsAnalysisLoading(false);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContract(null);
    setAnalysis(null);
  };
  const SkeletonLoader = () => (
    Array.from({ length: 3 }).map((_, i) => (
      <TableRow key={`skeleton-${i}`}>
        <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-10 inline-block" /></TableCell>
      </TableRow>
    ))
  );
  return (
    <>
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contract Analysis</h1>
          <p className="text-muted-foreground">Upload and analyze your legal documents with AI.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Upload a New Contract</CardTitle>
            <CardDescription>Drag and drop your file or click to select. The AI will analyze it for risks and key clauses.</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload onUpload={handleUpload} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analyzed Documents</CardTitle>
            <CardDescription>View and manage your previously analyzed contracts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : contracts.length > 0 ? (
                    contracts.map((contract) => (
                      <TableRow key={contract.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{contract.fileName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn('font-semibold', statusStyles[contract.status])}>
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(contract.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleViewAnalysis(contract)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Analysis</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No contracts analyzed yet.
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
      <ContractAnalysisModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        contract={selectedContract}
        analysis={analysis}
        isLoading={isAnalysisLoading}
      />
    </>
  );
}