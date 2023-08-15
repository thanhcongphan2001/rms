import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import httpRms from 'src/utils/httpRms'

const URL = 'purchases'

const projectManager = {
  getprojectManager(query:any) {
  
      return httpRms.get(`/project/api/v1/projects?page=${query.current}&size=${query.pageSize}`) 
 
  },
  getprojectManagerDetail(id:any){
    return httpRms.get(`/project/api/v1/projects/${id}/detail`) 
  }
 

}

export default projectManager
