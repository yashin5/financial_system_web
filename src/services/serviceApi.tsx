export const authenticateService = (email: string, password: string) => {
  const method = 'POST';
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify({ email, password });
  return fetch('https://financial-system.herokuapp.com/api/accounts/authenticate', {
    method,
    headers,
    body,
  });
};

export const validateTokenService = () =>{
  const session = localStorage.getItem('token');
  const method = 'POST';
  const headers = new Headers({ 'content-type': 'application/json' });  
  const body = JSON.stringify({ session });
  return fetch(`https://financial-system.herokuapp.com/api/auth/validate_token`, {
    method,
    headers,    
    body
  })  
  .then(res => {
    if(res.ok){ 
      return res.json()
    };
    throw res
  })
  // .then(res => res.is_valid)
  // .catch(err => err.statusText === "Unauthorized" && false)
}

export const createAccountService = (email: string, password: string, value: string, currency: string, name: string) => {
  const method = 'POST';
  const headers = new Headers({ 'content-type': 'application/json' });
  const body = JSON.stringify({
    email,
    password,
    value,
    currency,
    name,
  });
  return fetch('https://financial-system.herokuapp.com/api/accounts', {
    method,
    headers,
    body,
  });
};

export const getCurrenciesService = () => {
  const method = 'GET';
  const headers = new Headers({ 'content-type': 'application/json' });
  
  return fetch('https://financial-system.herokuapp.com/api/accounts/get_currencies', {
    method,
    headers,
  });
};

export const getBalanceService = () => {
  const session = localStorage.getItem('token');
  const headers = new Headers({ 'content-type': 'application/json', "authorization": `${session}` });
  const method = 'get';
  return fetch('https://financial-system.herokuapp.com/api/operations/show', {
    method,
    headers,
  });
};

export const depositService = (value: string, currency: string) => {
  const session = localStorage.getItem('token');
  const headers = new Headers({ 'content-type': 'application/json', "authorization": `${session}` });
  const method = 'post';
  const body = JSON.stringify({ value, currency });
  return fetch('https://financial-system.herokuapp.com/api/operations/deposit', {
    method,
    headers,
    body,
  });
};

export const withdrawnService = (value: string) => {
  const session = localStorage.getItem('token');
  const headers = new Headers({ 'content-type': 'application/json', "authorization": `${session}` });
  const method = 'post';
  const body = JSON.stringify({ value });
  return fetch('https://financial-system.herokuapp.com/api/operations/withdraw', {
    method,
    headers,
    body,
  });
};

export const transferService = (email: string, value: string) => {
  const session = localStorage.getItem('token');
  const headers = new Headers({ 'content-type': 'application/json', "authorization": `${session}` });
  const method = 'post';
  const body = JSON.stringify({ email, value });
  return fetch('https://financial-system.herokuapp.com/api/operations/transfer', {
    method,
    headers,
    body,
  });
};


export interface SplitList {
  email: string,
  percent: string
};

export const splitTransferService = (split_list: Array<any>, value: string) => {
  const session = localStorage.getItem('token');
  const headers = new Headers({ 'content-type': 'application/json', "authorization": `${session}` });
  const method = 'post';
  const body = JSON.stringify({ split_list, value });
  return fetch('https://financial-system.herokuapp.com/api/operations/split', {
    method,
    headers,
    body,
  });
};

export const addContactService = (nickname: string, email: string) => {
  const session = localStorage.getItem('token');
  const headers = new Headers({ 'content-type': 'application/json', "authorization": `${session}` });
  const method = 'post';
  const body = JSON.stringify({ nickname, email });
  return fetch('https://financial-system.herokuapp.com/api/operations/create_contact', {
    method,
    headers,
    body,
  });
};

export const getAllContactsService = () => {
  const session = localStorage.getItem('token');
  const headers = new Headers({ 'content-type': 'application/json', "authorization": `${session}` });
  const method = 'get';
  return fetch('https://financial-system.herokuapp.com/api/operations/get_all_contacts', {
    method,
    headers,
  });
};

