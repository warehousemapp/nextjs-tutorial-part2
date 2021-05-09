import React, { useState, useEffect } from "react";

import { getUsers } from "./API";

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const newUsers = await getUsers(page);
      setUsers((prev) => [...prev, ...newUsers]);
      setLoading(false);
    };

    loadUsers();
  }, [page]);

  return (
    <div>
      <div onScroll={handleScroll}>
        {users &&
          users.map((user) => (
            <div key={user.id} user={user}>
              <h1>{user.id}</h1>
            </div>
          ))}
      </div>
      {loading && <h1>Loading ...</h1>}
    </div>
  );
}

export default App;
