import React, { useState } from 'react';
import { Search, Plus, Send, Smile, Image as ImageIcon, Mic, MessageSquareText, FileText, Gift, User, Book, MessageSquare, Phone, CheckCircle, XCircle, ChevronDown, Check, Trash2, Edit } from 'lucide-react';
import { Tab } from '@headlessui/react';

// 模拟数据
const mockSessions = [
  { id: '1', name: '刘心妍', age: 25, type: '项目企业客户', status: '待处理', lastMessageTime: '10:30', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '2', name: '张建国', status: '处理中', lastMessageTime: '10:15', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '3', name: '王梦琪', status: '已完成', lastMessageTime: '10:08', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const mockChatHistory = [
  { id: '1', sender: 'customer', message: '你好，我想咨询一下有没有近期特价房源？', timestamp: '10:30' },
  { id: '2', sender: 'agent', message: '您好！我们近期有几套特价房源，请问您对哪个区域或房型有偏好呢？', timestamp: '10:31', isAI: true },
  { id: '3', sender: 'customer', message: '我预订的订单号是20231201A，想问一下入住时间还能调整吗？', timestamp: '10:35' },
  { id: '4', sender: 'agent', message: '请稍等，我帮您查询一下。您的订单号20231201A已确认，入住时间可以调整。您希望修改到哪一天呢？', timestamp: '10:36', isAI: true },
  { id: '5', sender: 'customer', message: '房间的空调好像坏了，有没有人可以过来修一下？', timestamp: '10:40' },
  { id: '6', sender: 'agent', message: '非常抱歉给您带来不便！请提供您的房间号，我们会立刻安排维修人员上门处理。', timestamp: '10:41', isAI: true },
  { id: '7', sender: 'customer', message: '退房流程是什么？可以直接离开吗？', timestamp: '10:45' },
  { id: '8', sender: 'agent', message: '您好，退房时无需办理额外手续，您可以直接离开。我们会在您退房后检查房间并发送离店确认短信。感谢您的入住！', timestamp: '10:46', isAI: true },
];

const mockCustomerInfo = {
  name: '刘心妍',
  age: 25,
  type: '普通客户',
  registrationTime: '2023-06-15',
  contact: '138****5678',
  usageProduct: '豪华套房',
  purchaseTime: '2023-11-20',
  orders: [
    { id: '20231201A', product: '豪华套房 (3晚)', status: '已确认' },
    { id: '20231115B', product: '标准间 (1晚)', status: '已完成' }
  ],
  serviceRecords: [
    { date: '12-05', content: '订单修改咨询' },
    { date: '11-28', content: '房间设施报修' },
    { date: '11-10', content: '预订流程咨询' }
  ],
  aiRecommendations: [
    '建议向客户推荐长租优惠',
    '了解客户对房间设施的偏好',
    '提供周边旅游景点信息'
  ]
};

const mockKnowledgeBase = [
  { id: '1', title: '如何预订房间', content: '您可以通过我们的官方网站、小程序或电话进行预订。在预订时请提供您的入住日期、退房日期和房型偏好。' , category: '预订服务'},
  { id: '2', title: '入住与退房流程', content: '入住时请凭有效身份证件到前台办理。退房时无需额外手续，您可以直接离开。' , category: '入住指南'},
  { id: '3', title: '取消订单政策', content: '根据您预订的房型和取消时间，可能会收取一定费用。请参考订单详情中的具体取消政策。' , category: '退订修改'},
  { id: '4', title: '房间设施报修指南', content: '如果房间内设施出现故障，请通过客服热线或在线客服联系我们，我们会尽快安排维修。' , category: '房间设施'},
];

const mockProducts = [
  { id: '1', name: '行政套房', price: '￥899/晚', description: '宽敞空间，独立客厅，配备智能家居' },
  { id: '2', name: '海景大床房', price: '￥650/晚', description: '一线海景，落地窗，配备观景阳台' },
  { id: '3', name: '亲子家庭房', price: '￥720/晚', description: '双卧室设计，儿童游乐区，家庭出游首选' },
];

const CustomerServiceSession: React.FC = () => {
  const [activeTab, setActiveTab] = useState('客户信息');
  const [selectedSession, setSelectedSession] = useState(mockSessions[0]);
  const [filterStatus, setFilterStatus] = useState('待处理');
  const [messageInput, setMessageInput] = useState('');

  const filteredSessions = mockSessions.filter(session => {
    if (filterStatus === '全部') return true;
    return session.status === filterStatus;
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // 模拟发送消息
      console.log('发送消息:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 leading-heading">客服会话</h1>
      <div className="flex h-full bg-gray-50 p-4 rounded-xl">
        {/* 左侧会话列表 */}
        <div className="w-1/4 bg-white rounded-lg shadow p-4 mr-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-gray-800">会话总览</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg flex flex-col items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">138</span>
              <span className="text-gray-600 text-sm">待处理</span>
            </div>
            <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center justify-center">
              <span className="text-green-600 text-2xl font-bold">86</span>
              <span className="text-gray-600 text-sm">已解决</span>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg flex flex-col items-center justify-center">
              <span className="text-yellow-600 text-2xl font-bold">42s</span>
              <span className="text-gray-600 text-sm">平均响应</span>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg flex flex-col items-center justify-center">
              <span className="text-purple-600 text-2xl font-bold">96%</span>
              <span className="text-gray-600 text-sm">满意度</span>
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索会话名称或关键字"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex space-x-2 mb-4">
            {['待处理', '处理中', '已完成'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${filterStatus === status ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex-grow overflow-y-auto pr-2">
            {filteredSessions.map(session => (
              <div
                key={session.id}
                className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${selectedSession.id === session.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedSession(session)}
              >
                <img src={session.avatar} alt={session.name} className="w-10 h-10 rounded-full mr-3" />
                <div className="flex-grow">
                  <div className="font-semibold text-gray-800 flex justify-between items-center">
                    <span>{session.name}</span>
                    <span className="text-xs text-gray-500">{session.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">{mockChatHistory.find(msg => msg.sender === 'customer' && msg.timestamp === session.lastMessageTime)?.message || '无最新消息'}</p>
                </div>
                {session.status === '待处理' && <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>}
              </div>
            ))}
          </div>
        </div>

        {/* 中间聊天区域 */}
        <div className="flex-grow bg-white rounded-lg shadow p-4 flex flex-col relative">
          {selectedSession ? (
            <>
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedSession.name} <span className="text-base font-normal text-gray-500">25岁女 · 项目企业客户</span>
                </h2>
                <div className="space-x-2">
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300">转接</button>
                  <button className="bg-primary-600 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-700">结束会话</button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto pr-2 mb-4">
                {mockChatHistory.map((msg) => (
                  <div key={msg.id} className={`flex mb-4 ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start max-w-[70%] ${msg.sender === 'agent' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {msg.sender === 'customer' && <img src={selectedSession.avatar} alt="" className="w-8 h-8 rounded-full mr-2" />}
                      <div className={`p-3 rounded-lg ${msg.sender === 'agent' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'}`}>
                        <p className="text-sm">
                          {msg.message}
                          {msg.isAI && <span className="ml-2 text-xs text-gray-500">(AI)</span>}
                        </p>
                        <span className={`block text-xs text-gray-400 mt-1 ${msg.sender === 'agent' ? 'text-right' : 'text-left'}`}>{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex flex-col">
                <div className="flex items-center space-x-3 mb-3">
                  <Smile className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                  <ImageIcon className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                  <Mic className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300">快捷回复</button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300">聊天记录</button>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="请输入消息..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-primary-500 focus:border-primary-500"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-primary-600 text-white px-4 py-2 rounded-r-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    <span className="ml-2">发送</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              请选择一个会话开始聊天
            </div>
          )}
        </div>

        {/* 右侧功能面板 */}
        <div className="w-1/4 bg-white rounded-lg shadow p-4 ml-4 flex flex-col">
          <Tab.Group selectedIndex={['客户信息', '知识库', '产品推荐'].indexOf(activeTab)} onChange={(index) => setActiveTab(['客户信息', '知识库', '产品推荐'][index])}>
            <Tab.List className="flex justify-around border-b mb-4">
              <Tab className={({ selected }) =>
                `w-full py-2 text-sm font-medium ${selected ? 'border-b-2 border-primary-500 text-primary-700' : 'text-gray-600'} focus:outline-none`
              }>客户信息</Tab>
              <Tab className={({ selected }) =>
                `w-full py-2 text-sm font-medium ${selected ? 'border-b-2 border-primary-500 text-primary-700' : 'text-gray-600'} focus:outline-none`
              }>知识库</Tab>
              <Tab className={({ selected }) =>
                `w-full py-2 text-sm font-medium ${selected ? 'border-b-2 border-primary-500 text-primary-700' : 'text-gray-600'} focus:outline-none`
              }>产品推荐</Tab>
            </Tab.List>

            <Tab.Panels className="flex-grow overflow-y-auto pr-2">
              {/* 客户信息面板 */}
              <Tab.Panel>
                <h3 className="font-bold text-gray-700 mb-3">客户信息</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>客户名称:</strong> {mockCustomerInfo.name}</p>
                  <p><strong>客户类型:</strong> {mockCustomerInfo.type}</p>
                  <p><strong>注册时间:</strong> {mockCustomerInfo.registrationTime}</p>
                  <p><strong>联系方式:</strong> {mockCustomerInfo.contact}</p>
                  <p><strong>使用产品:</strong> {mockCustomerInfo.usageProduct}</p>
                  <p><strong>购买时间:</strong> {mockCustomerInfo.purchaseTime}</p>
                </div>

                <h3 className="font-bold text-gray-700 mt-4 mb-3">最近订单</h3>
                {mockCustomerInfo.orders.map(order => (
                  <div key={order.id} className="border p-2 rounded-lg mb-2 text-sm">
                    <p>订单号: {order.id}</p>
                    <p>产品: {order.product}</p>
                    <p>状态: <span className="text-blue-500">{order.status}</span></p>
                  </div>
                ))}

                <h3 className="font-bold text-gray-700 mt-4 mb-3">服务记录</h3>
                {mockCustomerInfo.serviceRecords.map((record, index) => (
                  <div key={index} className="flex justify-between text-sm text-gray-700 mb-1">
                    <span>{record.content}</span>
                    <span className="text-gray-500">{record.date}</span>
                  </div>
                ))}

                <h3 className="font-bold text-gray-700 mt-4 mb-3">AI推荐话术</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {mockCustomerInfo.aiRecommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </Tab.Panel>

              {/* 知识库面板 */}
              <Tab.Panel>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索知识库"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <h3 className="font-bold text-gray-700 mb-3">知识库分类</h3>
                <div className="space-y-2">
                  {mockKnowledgeBase.map(kb => (
                    <div key={kb.id} className="border p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-semibold text-primary-700">{kb.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{kb.content}</p>
                    </div>
                  ))}
                </div>
              </Tab.Panel>

              {/* 产品推荐面板 */}
              <Tab.Panel>
                <h3 className="font-bold text-gray-700 mb-3">产品推荐</h3>
                <div className="space-y-3">
                  {mockProducts.map(product => (
                    <div key={product.id} className="flex items-center border p-3 rounded-lg">
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-800">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <p className="text-lg font-bold text-primary-600">{product.price}</p>
                      </div>
                      <button className="bg-primary-600 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-700">发送</button>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceSession; 