export const getAndStoreUser = (user, setUser) => {
  if (!sessionStorage.getItem("user")) {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  } else if (!!sessionStorage.getItem("user") && !Object.keys(user).length) {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  } else {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  }
};

export const getAndStoreCiph = (ciph, setCiph) => {
  if (!sessionStorage.getItem("ciph")) {
    setCiph(ciph);
    sessionStorage.setItem("ciph", JSON.stringify(ciph));
  } else if (!!sessionStorage.getItem("ciph") && !Object.keys(ciph).length) {
    setCiph(JSON.parse(sessionStorage.getItem("ciph")));
  } else {
    setCiph(ciph);
    sessionStorage.setItem("ciph", JSON.stringify(ciph));
  }
};
