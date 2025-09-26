export enum REQUEST_TYPES {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export enum SERVICE_PATHS {
  LOGIN = 'auth/login',
  REFRESH_TOKEN = 'auth/resfresh-token',

  GET_TAG = 'tag/get-tag',
  GET_TAG_LIST = 'tag/get-tag-list',
  GET_TAG_TRANSLATIONS = 'tag/get-tag-translations',
  CREATE_TAG = 'tag/create-tag',
  UPDATE_TAG = 'tag/update-tag',
  DELETE_TAG = 'tag/delete-tag',
  CREATE_TAG_TRANSLATION = 'tag/create-tag-translation',
  UPDATE_TAG_TRANSLATION = 'tag/update-tag-translation',
  DELETE_TAG_TRANSLATION = 'tag/delete-tag-translation',

  GET_AMENITY = 'amenity/get-amenity',
  GET_AMENITY_LIST = 'amenity/get-amenity-list',
  GET_AMENITY_TRANSLATIONS = 'amenity/get-amenity-translations',
  CREATE_AMENITY = 'amenity/create-amenity',
  UPDATE_AMENITY = 'amenity/update-amenity',
  DELETE_AMENITY = 'amenity/delete-amenity',
  CREATE_AMENITY_TRANSLATION = 'amenity/create-amenity-translation',
  UPDATE_AMENITY_TRANSLATION = 'amenity/update-amenity-translation',
  DELETE_AMENITY_TRANSLATION = 'amenity/delete-amenity-translation',

  GET_GEAR_LIST = 'gear/get-gear-list',
  CREATE_GEAR = 'gear/create-gear',
  UPDATE_GEAR = 'gear/update-gear',
  DELETE_GEAR = 'gear/delete-gear',
  CREATE_GEAR_TRANSLATION = 'gear/create-gear-translation',
  UPDATE_GEAR_TRANSLATION = 'gear/update-gear-translation',
  DELETE_GEAR_TRANSLATION = 'gear/delete-gear-translation',

  DISCOVER_TRAVEL_POINT = 'ai/discover-travel-point',
  TRAVEL_POINTS_SUMMARY = 'ai/travel-points-summary',

  GET_TRAVEL_POINT = 'travel-point/get-travel-point',
  GET_TRAVEL_POINT_LIST = 'travel-point/get-travel-point-list',
  CREATE_TRAVEL_POINT = 'travel-point/create-travel-point',
  UPDATE_TRAVEL_POINT = 'travel-point/update-travel-point',
  DELETE_TRAVEL_POINT = 'travel-point/delete-travel-point',
}
