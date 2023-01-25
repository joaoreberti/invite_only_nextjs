import { useEffect, useState } from "react";

async function fetchInvite(code: string): Promise<any> {
  try {
    const user = await fetch("/api/invite?code=" + code);
    const json = await user.json()
    return json
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default function useInvite(): [any | null, string | null] {
    const [inviteResponse, setInviteResponse] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = new URL(window.location.toString());
        const code = url.searchParams.get("code");
        
        if(!code) {
            setError("No invite code found");
            return;
        }
        fetchInvite(code).then((res) => {
            if (res) {
                console.log("should rerender")
                setInviteResponse(res);
            } else {
                setError("Invalid invite code");
            }
        })
    }, [])

    return [inviteResponse, error]
 }