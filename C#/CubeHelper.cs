using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System;


public class CubeHelper : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }
    public GameObject prefab;

    public Vector3 Count = new Vector3(1, 1, 1);

    public Vector3 Spacing = new Vector3(2, 1, 1);

    public string Direction = "xz";
    public Vector3 Rotation = new Vector3(0, 0, 0);
    public Vector3 AddRotation = new Vector3(0, 0, 0);
    public Vector3 AddHeight = new Vector3(0, 0, 0);

    [ContextMenu("创建")]
    public void CreateBlock()
    {
        ClearChild(this.gameObject);
        for (int x = 0; x < Count.x; x++)
        {
            for (int y = 0; y < Count.y; y++)
            {
                for (int z = 0; z < Count.z; z++)
                {
                    GameObject obj = GameObject.Instantiate(prefab);
                    obj.name = prefab.name;
                    obj.transform.SetParent(this.gameObject.transform);
                    obj.SetActive(true);

                    if (x % 2 == 0)
                    {
                        obj.transform.localPosition = new Vector3(Spacing.x * x / 2, Spacing.y * y, Spacing.z * z);
                    }
                    else
                    {
                        obj.transform.localPosition = new Vector3(-Spacing.x * (x + 1) / 2, Spacing.y * y, Spacing.z * z);
                    }

                    if (z % 2 == 0)
                    {
                        obj.transform.localPosition = new Vector3(obj.transform.localPosition.x, Spacing.y * y, Spacing.z * z / 2);
                    }
                    else
                    {
                        obj.transform.localPosition = new Vector3(obj.transform.localPosition.x, Spacing.y * y, -Spacing.z * (z - 1) / 2);
                    }


                    switch (Direction)
                    {
                        case "null":
                            obj.transform.Rotate(Rotation.x + AddRotation.x * x, Rotation.y + AddRotation.y * y, Rotation.z + AddRotation.z * z);
                            break;
                        case "x":
                            obj.transform.Rotate(Rotation.z, Rotation.y, Rotation.x + AddRotation.x * x);
                            break;
                        case "y":
                            obj.transform.Rotate(Rotation.x, Rotation.y + AddRotation.y * y, Rotation.z);
                            break;
                        case "z":
                            obj.transform.Rotate(Rotation.z + AddRotation.z * z, Rotation.y, Rotation.x);
                            break;
                        case "xz":
                            obj.transform.Rotate(Rotation.z + AddRotation.z * z, Rotation.y, Rotation.x + AddRotation.x * x);

                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }

    public void ClearChild(GameObject root)
    {

        List<GameObject> needDes = new List<GameObject>();

        for (int x = 0; x < root.transform.childCount; x++)
        {
            needDes.Add(root.transform.GetChild(x).gameObject);
        }
        for (int x = 0; x < needDes.Count; x++)
        {
            GameObject.DestroyImmediate(needDes[x]);
        }
    }

}

