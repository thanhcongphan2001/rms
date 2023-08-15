import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import httpRms from 'src/utils/httpRms'

const URL = 'purchases'

const resourceManagementSystem = {
  getLanguages() {
    return httpRms.get(`/langs/all`)
  },
  getlevels() {
    return httpRms.get(`/levels/all`)
  },
  getPositions() {
    return httpRms.get(`/positions/all`)
  },
  getCodeLangs() {
    return httpRms.get(`/codeLangs/all`)
  },
  getlocations() {
    return httpRms.get(`/locations/countries`)
  },
  getAll(){
   return Promise.all([this.getLanguages(),this.getlevels(),this.getPositions(),this.getCodeLangs(),this.getlocations()])
  },
  getList(query:any){
    return httpRms.get(`/users?page=${query.current}&size=${query.pageSize}`) 
  }
}

export default resourceManagementSystem
