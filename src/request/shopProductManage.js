import {createWs} from '../ws/index';
import mock from '../config/mock';
import {parseResult, packRequest} from '../utils/request';

// 查询门店列表
export const queryShopList = (params) => {
  params.check = 0;
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '门店1',
        addr: '地址1',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 0,
      },
      {
        id: 2,
        name: '门店2',
        addr: '地址2',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
      {
        id: 3,
        name: '门店3',
        addr: '地址3',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
      {
        id: 4,
        name: '门店4',
        addr: '地址4',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 0,
      },
      {
        id: 5,
        name: '门店5',
        addr: '地址5',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
    ]);
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2015')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 改变门店状态
export const changeState = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 查询门店审核列表
export const queryShopCheckList = (params) => {
  params.check = 1;
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '门店1',
        addr: '地址1',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 0,
      },
      {
        id: 2,
        name: '门店2',
        addr: '地址2',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
      {
        id: 3,
        name: '门店3',
        addr: '地址3',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
      {
        id: 4,
        name: '门店4',
        addr: '地址4',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 0,
      },
      {
        id: 5,
        name: '门店5',
        addr: '地址5',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
    ]);
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2015')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 确认审核通过
export const confirmCheck = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 查询员工列表
export const queryEmployeList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '员工1',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 1,
      },
      {
        id: 2,
        name: '员工2',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 0,
      },
      {
        id: 3,
        name: '员工3',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 1,
      },
      {
        id: 4,
        name: '员工4',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 0,
      },
      {
        id: 5,
        name: '员工5',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 0,
      },
    ]);
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 改变员工状态
export const changeEmployeState = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 查询产品列表
export const queryProducList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '洗澡1',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 0,
      },
      {
        id: 2,
        name: '洗澡2',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 1,
      },
      {
        id: 3,
        name: '洗澡3',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 0,
      },
      {
        id: 4,
        name: '洗澡4',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 1,
      },
      {
        id: 5,
        name: '洗澡5',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 1,
      },
    ]);
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 上下架产品
export const changeProductState = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 新增产品
export const addProduct = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}

// 编辑产品
export const editProduct = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        parseResult(resolve, result.data);
        task.close();
      })
    })
  })
}
