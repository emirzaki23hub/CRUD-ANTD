import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  Col,
  Form,
  Button,
  Input,
  InputNumber,
  message,
  List,
} from "antd";
import firebase from "./firebase-config";
import { Content, Header, Footer } from "antd/lib/layout/layout";

const layout = {
  labelCol: {
    span: 5,
  },
};
const userRef = firebase.firestore().collection("users");

const App = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const onFinish = (user) => {
    if (user?.id) {
      userRef
        .doc(user.id)
        .update(user)
        .then(() => {
          form.resetFields();
          setIsEdit(false);
          message.success("Your data is successfully updated");
        });
    } else {
      const id = userRef.doc().id;
      const data = {
        ...user,
        id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      userRef
        .doc(id)
        .set(data, { merge: true })
        .then(() => {
          form.resetFields();
          message.success("Your information has been saved");
        });
    }
  };
  const getUsers = () => {
    const unSub = userRef.onSnapshot((snapshot) => {
      const userList = [];
      if (snapshot) {
        snapshot.docs.map((doc) => userList.push(doc.data()));
      }
      setUsers(userList);
    });
    return () => unSub();
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    form.setFieldsValue(item);
  };
  const handleDelete = (id) => {
    userRef
      .doc(id)
      .delete()
      .then(() => message.success("Your data has been deleted "));
  };

  const renderUserList = () => {
    return (
      <List
        header={
          <div>
            {" "}
            <strong>User Data</strong>
          </div>
        }
        bordered
        dataSource={users}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a onClick={() => handleEdit(item)}>Edit</a>,
              <a onClick={() => handleDelete(item.id)}>Delete</a>,
            ]}
          >
            <List.Item.Meta title={item.name} description={item.email} />
            <div style={{ fontSize: "16px" }}>{item.age} Years old</div>
          </List.Item>
        )}
      />
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
        <Header><h1 style={{color:'white'}}>REACT CRUD APP</h1></Header>
      <Content   className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}>
      <Col style={{  margin:' 0 auto' }} span={8}>
          <Card
            title={isEdit ? "Edit your Infomation " : "Add your Information"}
          >
            <Form form={form} onFinish={onFinish} {...layout}>
              <Form.Item name="id" style={{ borderWidth: 1.5 }} />
              <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 99,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <br></br>
        <Col style={{  margin:' 0 auto' }} span={8}>
          {renderUserList()}
        </Col>
      </Content>
      <Footer style={{marginTop:'20px', textAlign:'center'}}>REACT APP DESIGN BY ANTD</Footer>
    </div>
  );
};

export default App;
