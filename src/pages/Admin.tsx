// import { PageContainer } from '@ant-design/pro-components';
// import { PropsWithChildren } from 'react';
//
// const Admin: React.FC<PropsWithChildren> = ({ children }) => {
//   return <PageContainer>{children}</PageContainer>;
// };
//
// export default Admin;
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {useRef} from 'react';
import {deleteUser, searchUsers, update} from "@/services/ant-design-pro/api";
import {Image, message} from "antd";
import enUS from 'antd/lib/locale/en_US'; // 引入英文语言包
import { ConfigProvider } from 'antd';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    fieldProps:{
      placeholder: ''
    }
  },
  {
    title: 'User Name',
    dataIndex: 'username',
    copyable: true,

  },
  {
    title: 'User Account',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: 'Avatar',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100}></Image>
      </div>
    ),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: { text: 'Female', status: 'Default', },
      1: {
        text: 'Male',
        status: 'Success',
      },
    },
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: 'User Status',
    dataIndex: 'userStatus',
  },
  {
    title: 'User Role',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: 'Normal User', status: 'Default', },
      1: {
        text: 'Administrator',
        status: 'Success',
      },
    },
  },
  {
    title: 'Create Time',
    dataIndex: 'createTime',
    valueType: 'date',
  },
  {
    title: 'Security Code',
    dataIndex: 'securityCode',
  },

  // {
  //   disable: true,
  //   title: '状态',
  //   dataIndex: 'state',
  //   filters: true,
  //   onFilter: true,
  //   ellipsis: true,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '超长'.repeat(50) },
  //     open: {
  //       text: '未解决',
  //       status: 'Error',
  //     },
  //     closed: {
  //       text: '已解决',
  //       status: 'Success',
  //       disabled: true,
  //     },
  //     processing: {
  //       text: '解决中',
  //       status: 'Processing',
  //     },
  //   },
  // },
  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },
  {
    title: 'Operate',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        Edit
      </a>,
      <a
        key="delete"
        onClick={async () => {
          try {
            // Call delete api
            console.log('ID IS ', record.id);
            const response = await deleteUser(record.id);
            if (response) {
              message.success('User deleted successfully!');
              action?.reload();  // Refresh the data
            }
          } catch (error) {
            console.error('Delete failed:', error);
            message.error('Delete failed, please try again later');
          }
        }}>
        Delete
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (

    <ConfigProvider locale={enUS}>
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(params,sort,filter);
        const userList = await searchUsers(params);
        return {
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
        onSave: async (id, data) => {
          console.log('Saving:', id, data);
          try {
            const updatedList = await update(data);
            if (updatedList){
              actionRef.current?.reload();
              message.success('edit successfully！');
            }

          } catch (error) {
            console.error('edit fail:', error);
            message.error('edit fail, please try again later');
          }
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"

      column={{
        search: {
          fieldProps: {
            placeholder: '', // 关闭提示词
          },
      }}}

      search={{
        labelWidth: 'auto',
        resetText: 'Reset',    // 修改重置按钮文本
        searchText: 'Search',
        collapseRender: (collapsed) => (
          <a>{collapsed ? 'Show Filters' : 'Hide Filters'}</a>  // 折叠按钮文本设置为英文
        ),
      }}

      locale={{
        emptyText: 'No data',        // 修改空数据提示文本
        filterConfirm: 'Confirm',    // 修改筛选确认按钮文本
        filterReset: 'Reset',        // 修改筛选重置按钮文本
        selectAll: 'Select all',     // 修改选择全部按钮文本
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
        showTotal: (total) => `Total ${total} items`, // 修改分页总数文本
      }}
      dateFormatter="string"
      headerTitle="User Management"></ProTable>
    </ConfigProvider>
  );
};
