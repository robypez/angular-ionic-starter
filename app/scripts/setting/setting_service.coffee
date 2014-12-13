# (->
#   setting = ($localStorage)=>
    
#     init = ()=>
#       @saveSetting = saveSetting
#       @readSetting = readSetting
#       @data = data

#     saveSetting = (key,value) =>
#       localStorage.key = value

#     readSetting = (key) =>
#       localStorage.key

#     init()
#     return


#   angular
#       .module('app')
#       .service('SettingService', setting)
# )()