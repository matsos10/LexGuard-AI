import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
}
export function FileUpload({ onUpload }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      setUploadedFile(file);
      try {
        await onUpload(file);
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setIsUploading(false);
        // Resetting state after a delay to show completion
        setTimeout(() => {
          setUploadedFile(null);
        }, 2000);
      }
    }
  }, [onUpload]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });
  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors duration-200 ease-in-out',
        isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted/50'
      )}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="font-medium">Analyzing "{uploadedFile?.name}"...</p>
          <p className="text-sm text-muted-foreground">This may take a moment.</p>
        </div>
      ) : uploadedFile ? (
        <div className="flex flex-col items-center gap-4 text-green-600">
            <FileIcon className="h-12 w-12" />
            <p className="font-medium">Analysis Complete!</p>
            <p className="text-sm text-muted-foreground">"{uploadedFile.name}" has been processed.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className={cn("rounded-full bg-muted p-4", isDragActive ? "bg-primary/20" : "")}>
            <UploadCloud className={cn("h-12 w-12 text-muted-foreground", isDragActive ? "text-primary" : "")} />
          </div>
          <p className="font-medium">
            {isDragActive ? 'Drop the file here' : 'Drag & drop a contract here, or click to select'}
          </p>
          <p className="text-sm text-muted-foreground">Supports: PDF, DOC, DOCX</p>
          <Button type="button" variant="outline" size="sm" className="mt-2 pointer-events-none">
            Select File
          </Button>
        </div>
      )}
    </div>
  );
}