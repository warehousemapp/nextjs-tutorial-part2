export const getUsers = async (page) => {
  const users = await (
    await fetch(
      `https://back-end-warehouseapp.herokuapp.com/teste/?per_page=100&page=${page}`
    )
  ).json();
  return users;
};
