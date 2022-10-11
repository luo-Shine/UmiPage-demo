import { useState , useEffect } from 'react';
import { Space , Table , Card , Button , Checkbox} from 'antd';
import _ from 'lodash';

interface Itemtype {
  key:number,
  name:string,
  goodsSale0:number,
  goodsSale1:number,
  goodsSale2:number,
  goodsSale3:number,
  goodsSale4:number,
}

export default function IndexPage() {
  const [dataSource , setDataSource] = useState<Itemtype[]>([]);
  const [addData , setAddData] = useState<Itemtype[]>([]);

  const columns = [
    {
      title: <Checkbox disabled></Checkbox>,
      render(){
        return(
          <Checkbox></Checkbox>
        )
      }
    },
    {
      title: '企业名称',
      dataIndex: 'name',
    },
    {
      title: '综合指数',
      dataIndex: 'goodsSale0',
    },
    {
      title: '创新指数',
      dataIndex: 'goodsSale1',
    },
    {
      title: '营业收入(万元)',
      dataIndex: 'goodsSale2',
    },
    {
      title: '税收(万元)',
      dataIndex: 'goodsSale3',
    },
    {
      title: '固投(万元)',
      dataIndex: 'goodsSale4',
      sorter: (a:any, b:any) => a.goodsSale4 - b.goodsSale4
    },
    {
      title: '操作',
      render(value:string,record:Itemtype){
        return (
          <a id='inner' onClick={() => {        
             addSource(record); 
             changeAdd(value)
          }}>添加</a>
        )
      }
    },
  ];
  const addColumns = [
    {
      title: <Checkbox disabled></Checkbox>,
      render(){
        return(
          <Checkbox></Checkbox>
        )
      }
    },
    {
      title: '企业名称',
      dataIndex: 'name',
    },
    {
      title: '',
      render(value:string,record:Itemtype){
        return (
          <a onClick={() => {
            deleteSource(record);
          }} style={{color:'red'}}>x</a>
        )
      }
    },
  ]; 
  
  const getData = () => {
     fetch('http://localhost:8000/api/users')
     .then(response => response.json())
     .then(res => {
      const result = res.data;
      console.log(result)
      setDataSource(result);
     });
  }
  
  const addSource = (record:Itemtype) => {
      let dataClone = _.cloneDeep(dataSource);
      dataClone.forEach((v , i) => {
        if(record.key === v.key){
          setAddData(value => value.concat(v));   //将数据添加至另一表格
        }
      });
  };

  const changeAdd = (value:string) => {
    const innerData = document.querySelector('#inner');
    console.log(innerData)
    if(innerData){
      innerData.innerHTML = "已添加"
    }
  }

  const deleteSource = (record:Itemtype) => {
    let addDataClone = _.cloneDeep(addData);
    addDataClone.forEach((v,i) => {
      if(record.key === v.key){
        addDataClone.splice(i,1)
      }
    });
    setAddData(addDataClone);
  }

  useEffect(() => {
    getData()
  },[])
  return (
   <>
       <Space direction='vertical' >
        <Card bordered={false}>
          <Button type='primary'>批量添加</Button> 
          <Table columns={columns} 
                 dataSource={dataSource} 
                 locale={{
                   triggerDesc: "点击降序",
                   triggerAsc: "点击升序",
                   cancelSort: "取消排序"
              }}/>
        </Card>
       </Space>
      <Space direction='vertical'>
      <Card bordered={false}  extra={<Button htmlType='submit'>提交</Button>}>
          <Button danger>批量移除</Button> &emsp;
          <Button danger>清空</Button> 
          <Table columns={addColumns} dataSource={addData} style={{width:500}}/>
        </Card>
      </Space>
     </>
  );
}
