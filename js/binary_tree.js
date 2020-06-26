class BinarySearchTree {
    //Raiz da árvore
    constructor() {
        this.root = null
    }
    /* 
      - Current recebe o o valor contido em root, ambas são variáveis
      - Current for igual a null retorna -1
      - Se não for null ele irá entrar no laço 
      - Equanto o valor na equerda for diferente de null current recebe current.left
      - Caso o valor da esquerda for igual a null, while é encerrado e  current tem o valor menor
    */
   //Menor valor da árvore
    min() {
        let current = this.root
        if (current == null)
            return null
        while (current.left != null)
            current = current.left
        return current.content
    }
   /* 
      - Current recebe o o valor contido em root, ambas são variáveis
      - Current for igual a null retorna -1
      - Se não for null ele irá entrar no laço 
      - Equanto o valor na direita for diferente de null current recebe current.left
      - Caso o valor da direita for igual a null, while é encerrado e  current tem o valor menor
    */
    //Maior valor da árvore
    max() {
        let current = this.root
        if (current == null)
            return null
        while (current.right != null)
            current = current.right
        return current.content
    }

    //Insere o elemento na árvore
    insert(element) {  
        this.root = this.insertNode(this.root, element)
        //Retorna uma referencia do nó
    }
    //Insert na árvore
    /*  Ao receber a referencia, insere no nó
      - Verificação para ver se esta vazio e insere em seguida
      - Verificação se é maior que a raiz
      - se for ele insere na direta
      - se nao ele insere a esquerda
    */
    insertNode(rootNode, element) {
        if (rootNode == null)
            return new Node(element)
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        return rootNode
    }

    //Função callback para cada nó, em ordem
    //Função recebe um callback
    inOrderTraverse(callback) {
        this.inOrderVisitor(this.root, callback)
    }
    /* Verificação se o nó é nulo
     - Nó nulu, não retornará nada
     - Diferente de nulu, retornará em  ordem
     - Esqueda,conteúdo e direita do nó
    */
    inOrderVisitor(node, callback) {
        if (node == null)
            return
        this.inOrderVisitor(node.left, callback)
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    //Função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }

    /*
      - Nó null não retorna nada
      - Diferente de null, é passado o conteúdo do nó dentro do callback
      - É mostrado a esquerda do nó
      - A direita do nó, é mostrado em seguida
    */ 
    preOrderVisitor(node, callback) {
        if (node == null)
            return
        callback(node.content)
        this.preOrderVisitor(node.left, callback)
        this.preOrderVisitor(node.right, callback)
    }

    //Função callback para cada nó porém em pós-ordem
    
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }
    //Recebe o método e a função
    /* 
      - Nó null não retorna nada
      - Diferente de null, é passado o conteúdo do nó dentro do callback
      - É mostrado a esquerda do nó
      - A direita do nó, é mostrado em seguida
    */
    postOrderVisitor(node, callback) {
        if (node == null)
            return
        this.postOrderVisitor(node.left, callback)
        this.postOrderVisitor(node.right, callback)
        callback(node.content)
    }

    /* Valor contido na ávore irá retornar true
      - Se o valor contido for nulo, o elemento não existe
      - Se o valor contido for igual ao conteúdo, achou
      - Se o valor contido for maior que o conteúdo:
        busca na direita
        busca na esquerda
    */
    search(value) {
        return this.searchVisitor(this.root, value)
    }

    searchVisitor(node, element) {
        if (node == null)
            return false
        if (node.content == element)
            return true;
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    /* 
       Remove um elemento existente na árvore e o retorna
       Remove e mostra a árvore atualizada após a remoção
    */
      remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }
    /* 
      - Valor do nó for igual ao valor, entra no segundo if      
      - Esquerdo for igual ao lado direito, retornará null
      - Direito for null retorna o lado esquerdo
      - Esquerdo for igual a null retorna o lado direito
      - Caso não aconteça nada citado a cima:
        Novo nó recebe o valor do lado direito
        Current também recebe o valor
            Valor do esquerdo for diferente de null, current receberá o valor do lado esquerdo
            e retornará o novo nó
      - Valor de content não for diferente a value
      - Value for maior que o valor do nó, entra dentro do if, valor a esquerda é removido 
      - Valor da direita é removido caso não seja feito, retornando o nó        
    */
    removeVisitor(node, value) {
        if (node.content == value) {
            if (node.left == node.right) {
                //Não tem filhos - Grau 0
                return null
            } else if (node.right == null) {
                // 0 filhos na direita, e tem nó na esqueda - Grau 1
                return node.left
            } else if (node.left == null) {
                // 0 filhos na esquerda, e tem nó da direita - Grau 1
                return node.right
            } else {
                // Dois ramos - Grau 2
                const newRoot = node.right
                let current = node.right;
                while (current.left != null)
                    current = current.left
                current.left = node.left
                return newRoot;
            }
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)
        } else {
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }
    //Altura da árvore
    height() {
        return this.heightVisitor(this.root)
    }
    
    /*  Recebe um nó e por padrão é null
      - Nó não for null retornará -1
      - LeftHeight = verificará o tamanho da altura da esquerda
      - RightHeight = verificará o tamanho da altura da direita
      - Retorna a variável que tiver o maior valor,somará + 1 que é a contagem do outro nó
    */
    heightVisitor(node) {
        if (!node)
            return -1
        let leftHeight = this.heightVisitor(node.left),
            rightHeight = this.heightVisitor(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    //Informa quantos nós existem
    //Retorna o tamanho a partir da raiz
    size() {

        return this.sizeVisitor(this.root)
    }
/* 
  - Se não existir nó, retorna 0 
  - Se existir nó, retornará o tamanho do nó da esquerda e o da direita
    somando ambos resultados com 1
*/
    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}
