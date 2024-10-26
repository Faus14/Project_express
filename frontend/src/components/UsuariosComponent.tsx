import React, { useState, useEffect } from 'react';
import { Card, Input, Row, Col, Alert, Button } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

interface Usuario {
  nombre: string;
  apellido: string;
}

const UsuariosComponent = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosBuscados, setUsuariosBuscados] = useState<Usuario[]>([]);
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  const [error, setError] = useState('');
  const [mostrarTodos, setMostrarTodos] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3001/usuarios');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      setUsuarios(data);
      setError('');
    } catch (err) {
      setError('Error al cargar usuarios');
      setUsuarios([]);
    }
  };

  const buscarUsuario = async () => {
    if (!nombreBusqueda.trim()) {
      setError('Por favor ingresa un nombre');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/usuario/${nombreBusqueda}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
      const data = await response.text();
      
      // Filtramos los usuarios que coinciden con la búsqueda
      const usuariosFiltrados = usuarios.filter(
        usuario => usuario.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase())
      );
      
      setUsuariosBuscados(usuariosFiltrados);
      setMostrarTodos(false);
      setError('');
    } catch (err) {
      setError('Usuario no encontrado');
      setUsuariosBuscados([]);
    }
  };

  const mostrarTodosUsuarios = () => {
    setMostrarTodos(true);
    setNombreBusqueda('');
    setError('');
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Gestión de Usuarios</h1>

      {/* Sección de búsqueda */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Input
          placeholder="Buscar usuario por nombre..."
          value={nombreBusqueda}
          onChange={(e) => setNombreBusqueda(e.target.value)}
          onPressEnter={buscarUsuario}
          prefix={<SearchOutlined />}
          style={{ maxWidth: '400px' }}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={buscarUsuario}
        >
          Buscar
        </Button>
        <Button
          icon={<UserOutlined />}
          onClick={mostrarTodosUsuarios}
        >
          Mostrar Todos
        </Button>
      </div>

      {error && (
        <Alert 
          message={error} 
          type="error" 
          showIcon 
          style={{ marginBottom: '16px' }}
        />
      )}

      {/* Lista de usuarios en cards */}
      <Row gutter={[16, 16]}>
        {(mostrarTodos ? usuarios : usuariosBuscados).map((usuario, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              title={`${usuario.nombre} ${usuario.apellido}`}
              bordered={true}
              hoverable
              style={{ height: '100%' }}
            >
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Apellido:</strong> {usuario.apellido}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Mensaje cuando no hay resultados */}
      {!mostrarTodos && usuariosBuscados.length === 0 && !error && (
        <Alert
          message="No se encontraron usuarios con ese nombre"
          type="info"
          showIcon
        />
      )}
    </div>
  );
};

export default UsuariosComponent;