
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

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
            className="bg-gradient-to-r from-[#0F172A]/95 via-[#1E293B]/95 to-[#0F172A]/95 backdrop-blur-lg border border-indigo-500/20 text-white shadow-lg"
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-indigo-400 font-medium">{title}</ToastTitle>}
              {description && <ToastDescription className="text-white/80">{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose className="text-white/60 hover:text-white/90" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
