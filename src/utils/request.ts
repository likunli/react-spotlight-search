
const throwNetworkException = () => Promise.reject({ code: 'NETWORK-ERROR' });

const throwRuntimeException = (err: any) => Promise.reject(err);

export const request = async ({
  url,
  method,
  headers,
  data
}: {
  url: string,
  method?: string,
  headers?: Record<string, string>,
  data?: any
}, options = {}): Promise<any> => {
  try {
    const response = await fetch(url,
      {
        method: method || 'GET',
        body: data ? JSON.stringify(data) : null,
        headers: headers || { 'content-type': 'application/json' },
        ...options
      });
    if (!response.ok) {
      return response.json().then(throwRuntimeException);
    }
    return response.json();
  } catch (e) {
    throwNetworkException();
  }
}