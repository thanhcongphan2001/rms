import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import httpRms from 'src/utils/httpRms'

const URL = 'purchases'

const resourceManagementSystem = {
  getLanguages() {
    return httpRms.get(`/user/api/v1/langs/all`)
  },
  getlevels() {
    return httpRms.get(`/user/api/v1/levels/all`)
  },
  getPositions() {
    return httpRms.get(`/user/api/v1/positions/all`)
  },
  getCodeLangs() {
    return httpRms.get(`/user/api/v1/codeLangs/all`)
  },
  getlocations() {
    return httpRms.get(`/user/api/v1/locations/countries`)
  },
  getAll(){
   return Promise.all([this.getLanguages(),this.getlevels(),this.getPositions(),this.getCodeLangs(),this.getlocations()])
  },
  getList(query:any){
    return httpRms.get(`/user/api/v1/users?page=${query.current}&size=${query.pageSize}`) 
  },
  deleteUser(id:any){
    return httpRms.delete(`/user/api/v1/users/${id}`)
  }
}

export default resourceManagementSystem
