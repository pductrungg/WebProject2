import React from 'react';
import {Table, Empty} from 'antd';
import {DownOutlined, RightOutlined} from '@ant-design/icons';

const DataTable = ({
  dataSource = [],
  columns = [],
  total = 0,
  pageSize = 10,
  onChange = (page, pageSize) => {},
  pageSizeOptions = ['10', '20', '50', '100'],
  heightTable = 0,
  rowSelection = null,
  bordered = true,
  rowClassName = false,
  showSizeChanger = true,
  showTotal = null,
  rowExpandable = false,
  ...props
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      // rowKey="id"
      scroll={{
        // y: `calc(71vh - ${heightTable}px)`,
        x: 'max-content',
      }}
      locale={{
        emptyText: <Empty description={<span>Không có dữ liệu</span>} />,
      }}
      pagination={{
        locale: {items_per_page: 'dòng/trang'},
        pageSize: pageSize,
        total: total,
        // showTotal: (total) => `Tổng  ${total}`,
        showTotal: showTotal,
        pageSizeOptions: pageSizeOptions,
        onChange: (page, pageSize) => {
          onChange(page, pageSize);
        },
        showSizeChanger: showSizeChanger,
      }}
      bordered={bordered}
      rowSelection={rowSelection ? rowSelection : null}
      size="small"
      rowClassName={(record, index) =>
        rowClassName ? (record.isActive ? '' : 'table-row-disable') : null
      }
      expandable={{
        expandIcon: ({expanded, onExpand, record}) =>
          expanded ? (
            <RightOutlined onClick={(e) => onExpand(record, e)} className="mr-2" />
          ) : rowExpandable ? (
            <DownOutlined
              onClick={(e) => onExpand(record, e)}
              className={`mr-2 ${record?.children?.length > 0 ? 'visible' : 'invisible'}`}
            />
          ) : null,
      }}
      {...props}
    />
  );
};

export default DataTable;
