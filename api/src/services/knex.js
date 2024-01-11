let conn;

const knexService = () => {
  if(!conn) {
    conn = ''
  }
  return conn
};

export default knexService;