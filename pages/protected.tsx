import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/protected');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
        <div>Signed in as {session.user.email}</div>
        <div>{content}</div>
      </>
    );
  }

  return <div>Access denied</div>;
}
