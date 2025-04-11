'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSecureData = async () => {
      try {
        const tokenRes = await fetch('/api/auth/get-token');
        const { accessToken } = await tokenRes.json();
        console.log(accessToken)

        const response = await fetch('http://localhost:4000/api/farmer', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchSecureData();
  }, []);

  return (
    <div>
      <h1>Farmers Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
