import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import type { Contract, ContractAnalysis } from '@shared/types';
import { AlertTriangle, CheckCircle, FileText, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
interface ContractAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Contract | null;
  analysis: ContractAnalysis | null;
  isLoading: boolean;
}
const riskStyles = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-700',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
  Low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700',
};
const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
    <Separator />
    <div className="space-y-4">
      <Skeleton className="h-5 w-1/4" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
    <div className="space-y-4">
      <Skeleton className="h-5 w-1/4" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  </div>
);
export function ContractAnalysisModal({ isOpen, onClose, contract, analysis, isLoading }: ContractAnalysisModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Contract Analysis Report</DialogTitle>
          <DialogDescription>
            AI-generated insights for: <span className="font-medium text-primary">{contract?.fileName}</span>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-6">
          <div className="py-4 space-y-6">
            {isLoading ? (
              <LoadingSkeleton />
            ) : analysis ? (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center"><FileText className="h-5 w-5 mr-2 text-accent" /> Executive Summary</h3>
                  <p className="text-muted-foreground text-pretty">{analysis.summary}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center"><Shield className="h-5 w-5 mr-2 text-accent" /> Identified Risks</h3>
                  <div className="space-y-3">
                    {analysis.risks.map((risk, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <AlertTriangle className={cn("h-5 w-5 mt-1", risk.level === 'High' ? 'text-red-500' : risk.level === 'Medium' ? 'text-yellow-500' : 'text-green-500')} />
                        <div>
                          <Badge variant="outline" className={cn('font-semibold', riskStyles[risk.level])}>{risk.level} Risk</Badge>
                          <p className="text-muted-foreground mt-1">{risk.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-accent" /> Key Clauses</h3>
                  <div className="space-y-4">
                    {analysis.keyClauses.map((clause, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-md border">
                        <p className="font-semibold text-primary">{clause.title}</p>
                        <p className="text-muted-foreground text-sm mt-1 text-pretty">{clause.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No analysis data available for this contract.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}