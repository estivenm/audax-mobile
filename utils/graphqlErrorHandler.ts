
export const handleGraphQLError = (error: any): string => {
  if (error.networkError) {
    console.log('Network error:', error.networkError);
    return 'Error de red: no se pudo conectar con el servidor.';
  }

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    console.error('GraphQL error:', error.graphQLErrors);
    return error.graphQLErrors[0].message || 'Error en la consulta GraphQL.';
  }

  console.error('Unknown error:', error);
  return 'Ocurrió un error inesperado.';
};
