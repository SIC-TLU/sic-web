import { toast } from "@/hooks/use-toast"

interface ShowToastType {
  title?: string;
  description?: string;
  duration?: number;
}

export const showErrorToast = ({
  description = "An error occurred.",
  title = "Error",
  duration = 1200
}: ShowToastType) => {
  return toast({
    title,
    description,
    variant: "destructive",
    duration
  })
}

export const showInfoToast = ({
  description = "An action successfully.",
  title = "Successfully",
  duration = 1200
}: ShowToastType) => {
  return toast({
    title,
    description,
    variant: "default",
    duration
  })
}
