import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("test")
public class Service {
    String strang = "Halløj.. er det mig du kigger efter? Ich kann es in deinen Augen sehen-";
    List<String> names = new ArrayList<>(Arrays.asList("Nikolikolaj", "JoJo", "Anaximander"));

    @GET
    public String getTest(){
        return strang;
    }

    @Path("names")
    @GET
    public List<String> getNames(){
        return names;
    }

    @Path("names")
    @POST
    public void addNames(String name){
        names.add(name);
    }
}