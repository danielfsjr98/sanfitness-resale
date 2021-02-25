import store from '../store'
import route from '../config/router'
export default {

  authorizedUseAccess: (userId) => {
    const userLogged = store.getters['Auth/getUser']
    if(userLogged.id !== userId && !userLogged.admin) route.go(-1)
  },
  formatCurrency: value =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    parseFloat(value)
  ),
  formatDate: (date) => {
    const data = new Date(date),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    const dataF = diaF+"/"+mesF+"/"+anoF;
    return dataF
  }
};
