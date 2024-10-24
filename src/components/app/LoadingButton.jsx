import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

function LoadingButton({text="Submit", type="submit", className ="", loading = false, ...props }) {
  return (
    <Button 
    type={type} 
    className={`w-full mt-5 bg-orange-700 hover:bg-orange-600 ${className}`}
    disabled={loading} 
    {...props}
    >
      {
        loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait</>  : <span>{text}</span>
      }
      </Button>
  )
}

export default LoadingButton