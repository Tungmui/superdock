export default {
  // 服务器本地
  local: {
    debug: '/user',
    login: '/oauth/token',
    nodes: '/api/v1/nodes',
    plans: '/api/v1/plans',
    user: '/api/v1/user/'
  },
  // 服务器远端
  remote: {
    // Reverse proxy corss GWF in China
    gMap: "https://ditu.gdgdocs.org/maps/api/js",
    // Google official map API
    //gMap: "https://maps.googleapis.com/maps/api/js",
    // Google China official map API
    //gMap: "https://ditu.google.cn/maps/api/js",
    cyApi: 'https://api.caiyunapp.com/v2',
    weather: 'https://weather.sb.im/get'
  },
  config: {
    "server": "/samples",
    "client_id": "c9e773cf248b00af3a7561b5f105816b905ebbe5c56f47ebbb81de66743a3122",
    "client_secret": "f62b30384cb82ba78d15ea68d13881b7a18866df75f15f79bec1df428eab5b32",
    "suffix": ".json",
    "lang": "zh",
    "GMAP_API_KEY": "AIzaSyB4ReiTkBq7bw1sFd0EgnO55WnGWQ46MZI",
    "CY_API_TOKEN": "Lczn9EiN0OBoG4dw",
    "mqtt_url": "ws://admin:public@rsd.ganghang.sbnet.xyz:8083/mqtt",
    "ice_server": "stun:47.107.42.130"
  }
}

// ganghang@ganghang.com
// 647da135
// http://rsd.ganghang.sbnet.xyz//oauth/token
// https://github.com/SB-IM/SDWC/tree/master/client
// http://ganghang.sbnet.xyz/#/login