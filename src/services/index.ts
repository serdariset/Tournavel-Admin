import AmenityServices from './resource/AmenityServices'
import GearServices from './resource/GearServices'
import TagServices from './resource/TagServices'
import AuthServices from './user/AuthServices'
import AIServices from './resource/AIServices'
import TravelPointServices from './resource/TravelPointServices'

const APIMaker = (service: string): string => {
  return `http://159.69.1.247:3000/api/v1/${service}/`
}

export const UserAPI = {
  Auth: new AuthServices(APIMaker('user')),
}

export const ResourceAPI = {
  Tag: new TagServices(APIMaker('resource')),
  Amenity: new AmenityServices(APIMaker('resource')),
  Gear: new GearServices(APIMaker('resource')),
  AI: new AIServices(APIMaker('resource')),
  TravelPoint: new TravelPointServices(APIMaker('resource')),
}
