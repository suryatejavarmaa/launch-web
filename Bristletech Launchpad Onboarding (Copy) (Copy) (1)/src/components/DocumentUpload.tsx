import { useState } from 'react';
import { Upload, FileText, Camera, Check, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

// STRICT COLOR PALETTES - NO PINK/PURPLE
const RED_GRADIENT = 'linear-gradient(135deg, #FF3A4A 0%, #FF5E63 100%)';
const BLUE_GRADIENT = 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)';

interface DocumentUploadProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  onComplete: (field: string, xp: number, reason: string) => void;
}

export function DocumentUpload({ formData, onChange, onComplete }: DocumentUploadProps) {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const getGradient = () => {
    if (theme.mode === 'dual') return 'linear-gradient(135deg, #FF3A4A 0%, #00A9FF 100%)';
    if (theme.mode === 'fire') return RED_GRADIENT;
    if (theme.mode === 'ice') return BLUE_GRADIENT;
    return 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)';
  };

  const getGlowColor = () => {
    if (theme.mode === 'dual') return 'rgba(0, 169, 255, 0.15)';
    if (theme.mode === 'fire') return 'rgba(255, 58, 74, 0.15)';
    if (theme.mode === 'ice') return 'rgba(0, 169, 255, 0.15)';
    return 'rgba(59, 130, 246, 0.15)';
  };

  const getIconColor = () => {
    if (theme.mode === 'dual') return '#00A9FF';
    if (theme.mode === 'fire') return '#FF5E63';
    if (theme.mode === 'ice') return '#4AD4FF';
    return '#60a5fa';
  };

  const gradient = getGradient();
  const glowColor = getGlowColor();
  const iconColor = getIconColor();

  const handleFileChange = (field: string, file: File | null) => {
    onChange(field, file);
    if (file) {
      onComplete(field, 15, `${field} uploaded`);
    }
  };

  const documents = [
    { 
      id: 'collegeId', 
      label: 'College ID', 
      icon: FileText,
      required: true,
      accept: '.png,.jpg,.jpeg,.pdf',
      hint: 'PNG, JPG or PDF (max 5MB)'
    },
    { 
      id: 'governmentId', 
      label: 'Government ID', 
      icon: FileText,
      required: false,
      accept: '.png,.jpg,.jpeg,.pdf',
      hint: 'Aadhaar or Driving License'
    },
    { 
      id: 'photo', 
      label: 'Personal Photo', 
      icon: Camera,
      required: false,
      accept: 'image/*',
      hint: 'For your profile'
    },
    { 
      id: 'resume', 
      label: 'Resume (Optional)', 
      icon: FileText,
      required: false,
      accept: '.pdf',
      hint: 'PDF format only'
    },
  ];

  const uploadedCount = documents.filter(doc => formData[doc.id]).length;

  return (
    <div className="space-y-3">
      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full group relative"
      >
        {/* Subtle Glow - Theme Color */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
          style={{
            background: glowColor,
          }}
        />
        
        <div className="relative flex items-center justify-between p-5 glass-dark rounded-xl border border-white/10 backdrop-blur-xl transition-all group-hover:border-white/20">
          <div className="flex items-center gap-3">
            {/* Upload Icon with Theme Gradient */}
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden"
            >
              {/* Dynamic Gradient Background */}
              <div 
                className="absolute inset-0"
                style={{ 
                  background: gradient,
                }}
              />
              <Upload className="w-5 h-5 text-white relative z-10" strokeWidth={2} />
            </div>
            <div className="text-left">
              <span className="text-slate-200 font-medium">Document Verification</span>
              {uploadedCount > 0 && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {uploadedCount} of {documents.length} uploaded
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {uploadedCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
                <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={2.5} />
                <span className="text-xs text-green-400 font-medium">{uploadedCount}</span>
              </div>
            )}
            
            {/* Dropdown Arrow with Theme Color */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown 
                className="w-5 h-5"
                style={{ color: iconColor }}
              />
            </motion.div>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              {documents.map((doc) => {
                const Icon = doc.icon;
                const file = formData[doc.id];
                
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-sm text-slate-400">
                      <Icon 
                        className="w-4 h-4"
                        style={{ color: iconColor }}
                      />
                      {doc.label}
                      {doc.required && <span className="text-red-400">*</span>}
                    </label>
                    
                    <div className="relative group/upload">
                      <input
                        type="file"
                        accept={doc.accept}
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0] || null;
                          if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
                            alert('File size must be less than 5MB');
                            return;
                          }
                          handleFileChange(doc.id, selectedFile);
                        }}
                        className="hidden"
                        id={`upload-${doc.id}`}
                      />
                      
                      {/* Hover Glow - Theme Color */}
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/upload:opacity-100 transition-opacity blur-md"
                        style={{
                          background: glowColor,
                        }}
                      />
                      
                      <label
                        htmlFor={`upload-${doc.id}`}
                        className={`relative flex items-center gap-3 px-4 py-3.5 border-2 border-dashed rounded-xl cursor-pointer transition-all backdrop-blur-xl ${
                          file
                            ? 'border-green-500/50 bg-green-500/10'
                            : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        {file ? (
                          <>
                            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-5 h-5 text-green-400" strokeWidth={2.5} />
                            </div>
                            <span className="text-sm text-green-300 truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                handleFileChange(doc.id, null);
                              }}
                              className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0"
                            >
                              <X className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Upload Icon with Theme Color */}
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{
                                background: glowColor,
                              }}
                            >
                              <Upload 
                                className="w-4 h-4"
                                style={{ color: iconColor }}
                              />
                            </div>
                            <span className="text-sm text-slate-400">Choose file</span>
                          </>
                        )}
                      </label>
                    </div>
                    
                    <p className="text-xs text-slate-600">{doc.hint}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}