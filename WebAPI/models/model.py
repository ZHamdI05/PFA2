import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import csr_matrix

KNN = 1 #Set Number of neighbors

projects_df = pd.read_csv('projects.csv',usecols=['ProjectId','ProjectName'],dtype={'ProjectId': 'int32', 'ProjectName': 'str'})
rating_df=pd.read_csv('ratings.csv',usecols=['UserId', 'ProjectId', 'Value'],
    dtype={'UserId': 'int32', 'ProjectId': 'int32', 'Value': 'float32'})

df = pd.merge(rating_df,projects_df,on='ProjectId')
projectfeaturesdf = df.pivot_table(index='ProjectName',columns='UserId',values='Value').fillna(0)



projectfeaturesdfmatrix = csr_matrix(projectfeaturesdf.values)




model_knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
model_knn.fit(projectfeaturesdf)
query_index = 0
distances, indices = model_knn.kneighbors(projectfeaturesdf.iloc[query_index,:].values.reshape(1, -1), n_neighbors = KNN)
result = "herewego"
for i in range(1, len(distances.flatten())):
       result += "{0}: {1}, with distance of {2}:\n".format(i, projectfeaturesdf.index[indices.flatten()[i]], distances.flatten()[i])