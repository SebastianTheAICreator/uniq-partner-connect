
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { motion } from "framer-motion";

export function Toaster() {
  const { toasts } = useToast();
  
  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        ...props
      }) {
        return (
          <Toast 
            key={id} 
            className="bg-gradient-to-r from-[#0F172A]/95 via-[#1E293B]/95 to-[#0F172A]/95 backdrop-blur-lg border border-indigo-500/20 text-white shadow-xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-1"
            >
              {title && (
                <ToastTitle className="text-indigo-400 font-medium flex items-center">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {title}
                  </motion.span>
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-white/80">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {description}
                  </motion.span>
                </ToastDescription>
              )}
            </motion.div>
            
            {action && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                {action}
              </motion.div>
            )}
            
            <ToastClose className="text-white/60 hover:text-white/90 hover:bg-white/10 rounded-full transition-colors" />
            
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
